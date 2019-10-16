import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

import { addTripToMap } from "../../MapHelpers";

import { Row, Col } from "./Utilities.jsx";
import { formatDistance } from "../format";

const emptyState = { displayName: "", latitude: 0, longitude: 0 };

const directionsService = new window.google.maps.DirectionsService();

const rome2rioApiUrl = "https://www.rome2rio.com/api/1.5/json/Search";
const rome2rioSearchOptions =
  "key=oK8vkE5x&noAir&noAirLeg&noBus&noFerry&noCar&noBikeshare&noRideshare&noTowncar&noCommuter&noSpecial&noMinorStart&noMinorEnd&noPrice&noStop";

const getPath = async (origin, destination) => {
  try {
    const result = await fetch(
      `${rome2rioApiUrl}?oName=${encodeURIComponent(
        origin
      )}&dName=${encodeURIComponent(destination)}&${rome2rioSearchOptions}`,
      { referrerPolicy: "no-referrer" }
    );
    const { paths, routes } = await result.json();
    const path = routes[0].segments.reduce(
      (res, idx) => [
        ...res,
        ...window.google.maps.geometry.encoding.decodePath(paths[idx])
      ],
      []
    );
    return path;
  } catch (e) {
    console.log("Route not found", e);
    return [];
  }
};

const AutocompletePlaceField = ({
  place,
  setPlace,
  placeholder,
  updatePath,
  isOrigin
}) => {
  const handleSelect = async address => {
    const [result] = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(result);
    const { formatted_address } = result; // eslint-disable-line camelcase
    const newPlace = {
      displayName: formatted_address,
      latitude: lat,
      longitude: lng
    };
    setPlace(newPlace);
    updatePath(newPlace, isOrigin);
  };
  return (
    <PlacesAutocomplete
      value={place.displayName}
      onChange={e => {
        if (!e) setPlace(emptyState);
        setPlace(prev => ({ ...prev, displayName: e }));
      }}
      onSelect={e => handleSelect(e)}
      debounce={500}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="autocomplete-wrapper">
          <input {...getInputProps({ placeholder })} />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? "autocomplete-item active"
                : "autocomplete-item";
              return (
                <div {...getSuggestionItemProps(suggestion, { className })}>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

const colClass1 = "col-lg-1 d-flex flex-column my-2";
const colClass2 = "col-lg-2 d-flex flex-column my-2";
const colClass3 = "col-lg-3 d-flex flex-column my-2";

const ADD_TRIP = gql`
  mutation addTrip($trip: TripInput!) {
    addTrip(trip: $trip) {
      userId
    }
  }
`;

const dateToHours = date => Math.round(new Date(date).getTime() / 3600000);

export const MapForm = withRouter(({ history, refetch, refetchAppData }) => {
  const [origin, setOrigin] = useState(emptyState);
  const [destination, setDestination] = useState(emptyState);
  const [date, setDate] = useState("");
  const [pathString, setPathString] = useState("");
  const [previousPath, setPreviousPath] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isInvalidRoute, setInvalidRoute] = useState(false);
  const [addTrip] = useMutation(ADD_TRIP);

  const { mapObj } = window;

  const updatePath = async (newPlace, isOrigin) => {
    const newOrigin = isOrigin ? newPlace : origin;
    const newDestination = isOrigin ? destination : newPlace;

    if (newOrigin.displayName && newDestination.displayName) {
      const path = await getPath(
        newOrigin.displayName,
        newDestination.displayName
      );

      if (previousPath) previousPath.setMap(null);
      if (path.length > 0) {
        setPathString(window.google.maps.geometry.encoding.encodePath(path));
        const line = addTripToMap(directionsService, mapObj, "#FF0000")(path);
        setPreviousPath(line);
        const pathDistance = window.google.maps.geometry.spherical.computeLength(
          path
        );
        setDistance(pathDistance);
        setInvalidRoute(false);
      } else {
        setPathString("");
        setDistance(null);
        setInvalidRoute(true);
      }
    }
  };

  const userId = localStorage.getItem("userId");
  return (
    <form
      className="form-layout"
      onSubmit={async e => {
        e.preventDefault();
        const timestamp = dateToHours(date);
        const trip = {
          origin,
          destination,
          timestamp,
          path: pathString
        };
        await addTrip({ variables: { trip } });
        setOrigin(emptyState);
        setDestination(emptyState);
        setDate("");
        setPathString("");
        setDistance(null);
        setInvalidRoute(false);
        setTimeout(history.push(`/${userId}`), 1000);
        await refetch();
        refetchAppData();
      }}
    >
      <Row>
        <Col className={colClass3}>
          <AutocompletePlaceField
            place={origin}
            setPlace={setOrigin}
            placeholder="Origin"
            updatePath={updatePath}
            isOrigin
          />
        </Col>
        <Col className={colClass3}>
          <AutocompletePlaceField
            place={destination}
            setPlace={setDestination}
            placeholder="Destination"
            updatePath={updatePath}
          />
        </Col>
        <Col className={colClass3}>
          <div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </Col>
        <Col className={colClass1}>
          <div className="my-auto">
            {distance && formatDistance(distance)}
            {isInvalidRoute && <small className="mt-2">No route… 😔</small>}
          </div>
        </Col>
        <Col className={colClass2}>
          <button
            className="button-cta"
            type="submit"
            disabled={
              !origin ||
              !destination ||
              !date ||
              !userId ||
              !pathString ||
              isInvalidRoute
            }
          >
            Add Trip
          </button>
        </Col>
      </Row>
    </form>
  );
});
