import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { addTripsToMap } from "../../MapHelpers";

import { Row, Col } from "./Utilities.jsx";

const emptyState = { displayName: "", latitude: 0, longitude: 0 };

const AutocompletePlaceField = ({ place, setPlace, placeholder }) => {
  const handleSelect = async address => {
    const [result] = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(result);
    const { formatted_address } = result; // eslint-disable-line camelcase
    setPlace({ displayName: formatted_address, latitude: lat, longitude: lng });
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

const colClass = "col-md-3 d-flex flex-column align-items-start my-2";

const ADD_TRIP = gql`
  mutation addTrip($trip: TripInput!) {
    addTrip(trip: $trip) {
      userId
    }
  }
`;

const dateToHours = date => Math.round(new Date(date).getTime() / 3600000);

export const MapForm = () => {
  const [origin, setOrigin] = useState(emptyState);
  const [destination, setDestination] = useState(emptyState);
  const [date, setDate] = useState("");
  const [addTrip] = useMutation(ADD_TRIP);
  if (origin.latitude && destination.latitude) {
    addTripsToMap([
      {
        origin: { latitude: origin.latitude, longitude: origin.longitude },
        destination: {
          latitude: destination.latitude,
          longitude: destination.longitude
        }
      }
    ]);
  }
  return (
    <form
      className="form-layout"
      onSubmit={e => {
        e.preventDefault();
        const timestamp = dateToHours(date);
        const trip = {
          origin,
          destination,
          timestamp
        };
        addTrip({ variables: { trip } });
      }}
    >
      <Row>
        <Col className={colClass}>
          <div>Origin</div>
          <AutocompletePlaceField place={origin} setPlace={setOrigin} />
        </Col>
        <Col className={colClass}>
          <div>Destination</div>
          <AutocompletePlaceField
            place={destination}
            setPlace={setDestination}
          />
        </Col>
        <Col className={colClass}>
          <div>Date</div>
          <div>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </Col>
        <Col className={colClass}>
          <button className="button-cta" type="submit">
            Add Trip
          </button>
        </Col>
      </Row>
    </form>
  );
};
