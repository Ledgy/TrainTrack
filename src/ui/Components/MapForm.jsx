import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from "react-router-dom";

import { addTripToMap, routeOptions } from "../../MapHelpers";

import { Row, Col } from "./Utilities.jsx";
import { formatDistance } from "../format";

const emptyState = { displayName: "", latitude: 0, longitude: 0 };

const directionsService = new window.google.maps.DirectionsService();

const getGoogleLocationFromCoordinates = (longitude, latitude) =>
  new window.google.maps.LatLng(longitude, latitude);

const getPath = request =>
  new Promise((resolve, reject) => {
    directionsService.route(request, (response, status) => {
      if (status === "OK") {
        resolve(response.routes[0]);
      } else {
        reject(response);
      }
    });
  });

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
  const [addTrip] = useMutation(ADD_TRIP);

  const { mapObj } = window;

  const updatePath = async (newPlace, isOrigin) => {
    const newOrigin = isOrigin ? newPlace : origin;
    const newDestination = isOrigin ? destination : newPlace;

    if (newOrigin.latitude && newDestination.latitude) {
      const googleOrigin = getGoogleLocationFromCoordinates(
        newOrigin.latitude,
        newOrigin.longitude
      );
      const googleDestination = getGoogleLocationFromCoordinates(
        newDestination.latitude,
        newDestination.longitude
      );

      const tripRequest = {
        origin: googleOrigin,
        destination: googleDestination,
        ...routeOptions
      };

      const response = await getPath(tripRequest);
      setPathString(response ? response.overview_polyline : "");
      if (previousPath) previousPath.setMap(null);
      const line = addTripToMap(directionsService, mapObj, "#FF0000")(
        response.overview_path
      );
      setPreviousPath(line);
      setDistance(response ? response.legs[0].distance.value : null);
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
          <div className="text-left my-auto">
            {distance && formatDistance(distance)}
          </div>
        </Col>
        <Col className={colClass2}>
          <button
            className="button-cta"
            type="submit"
            disabled={
              !origin || !destination || !date || !userId || !pathString
            }
          >
            Add Trip
          </button>
        </Col>
      </Row>
    </form>
  );
});
