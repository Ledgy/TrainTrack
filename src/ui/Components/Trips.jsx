import React from "react";
import trainIcon from "../../static/trainIcon.png";
import { formatDistance } from "../format";

const getTrip = ({ origin, destination, timestamp, distance }, i) => (
  <div className="px-4 d-inline-flex trip-box" key={i}>
    <p className="px-2">{origin.displayName.slice(0, 20)}</p>
    <img src={trainIcon} alt="Train Icon" className="trip-icon my-auto" />
    <p className="px-2">{destination.displayName.slice(0, 20)}</p>
    <p className="px-2">{new Date(timestamp).toLocaleDateString()}</p>
    <p className="px-2">{formatDistance(distance)}</p>
  </div>
);

export const Trips = ({ tripsData }) => {
  return (
    <div className="trip-card py-4">
      <h1>My trips</h1>
      <div>{tripsData.map((trip, i) => getTrip({ ...trip }, i))}</div>
    </div>
  );
};
