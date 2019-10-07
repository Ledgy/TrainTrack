import React from "react";
import trainIcon from "../../static/trainIcon.png";
import { formatDistance } from "../format";

const TripRow = ({ origin, destination, timestamp, distance }) => (
  <div className="px-4 d-inline-flex trip-box">
    <p className="px-2">{origin.displayName.slice(0, 20)}</p>
    <img src={trainIcon} alt="Train Icon" className="trip-icon my-auto" />
    <p className="px-2">{destination.displayName.slice(0, 20)}</p>
    <p className="px-2">{new Date(timestamp).toLocaleDateString()}</p>
    <p className="px-2">{formatDistance(distance)}</p>
  </div>
);

export const Trips = ({ name, trips }) => {
  return (
    <div className="trip-card py-4">
      <h1>{`${name}’s trips`}</h1>
      <div>
        {trips.map((trip, i) => (
          <TripRow {...trip} key={`${trip.timestamp}-${i}`} /> // eslint-disable-line react/no-array-index-key
        ))}
      </div>
    </div>
  );
};
