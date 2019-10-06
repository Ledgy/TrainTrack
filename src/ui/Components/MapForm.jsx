import React, { useState } from "react";

export const MapForm = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  return (
    <form
      className="p-4"
      onSubmit={e => {
        e.preventDefault();
        console.log(origin, destination, date);
      }}
    >
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={e => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={e => setDestination(e.target.value)}
      />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button type="submit">Go</button>
    </form>
  );
};
