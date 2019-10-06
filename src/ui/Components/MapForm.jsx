import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const AutocompletePlaceField = ({ place, setPlace, placeholder }) => {
  const  handleSelect = async address => {
    const [ result ] = await geocodeByAddress(address);
    const { lat, lng } = await getLatLng(result);
    const { formatted_address } = result;
    setPlace({ displayName: formatted_address, latitude: lat, longitude: lng })
  };
  return (
    <PlacesAutocomplete
    value={place.displayName}
    onChange={e => setPlace(prev => ({...prev, displayName: e}))}
    onSelect={e => handleSelect(e)}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div>
        <input
          {...getInputProps({
          placeholder,
          className: 'location-search-input',
          })}
        />
        <div className="autocomplete-dropdown-container">
        {loading && <div>Loading...</div>}
        {suggestions.map(suggestion => {
          const className = suggestion.active
          ? 'autocomplete-item--active'
          : 'autocomplete-item';
            return (
              <div {...getSuggestionItemProps(suggestion, { className })} >
                <span>{suggestion.description}</span>
              </div>
            );
        })}
        </div>
      </div>
      )}
    </PlacesAutocomplete>
)};

export const MapForm = () => {
  const emptyState = { displayName: '', latitude: 0, longitude: 0 };
  const [origin, setOrigin] = useState(emptyState);
  const [destination, setDestination] = useState(emptyState);
  const [date, setDate] = useState('');

  return (
    <form
      className="p-4"
      onSubmit={e => {
        e.preventDefault();
        console.log(origin, destination, date);
      }}
    >
      <AutocompletePlaceField
        place={origin}
        setPlace={setOrigin}
        placeholder="Set origin"
      />
      <AutocompletePlaceField
        place={destination}
        setPlace={setDestination}
        placeholder="Set destination"
      />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Go</button>
    </form>
  );
};
