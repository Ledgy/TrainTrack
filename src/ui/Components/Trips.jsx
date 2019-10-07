import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import trainIcon from "../../static/trainIcon.png";
import { formatDistance, formatTimestamp } from "../format";

const DELETE_TRIP = gql`
  mutation deleteTrip($id: ID!) {
    deleteTrip(id: $id)
  }
`;

const TripRow = ({
  _id,
  origin,
  destination,
  timestamp,
  distance,
  deleteTrip,
  refetch,
  isMe
}) => (
  <div className="px-4 d-inline-flex trip-box">
    <p className="px-2">{origin.displayName.slice(0, 20)}</p>
    <img src={trainIcon} alt="Train Icon" className="trip-icon my-auto" />
    <p className="px-2">{destination.displayName.slice(0, 20)}</p>
    <p className="px-2">{formatTimestamp(timestamp)}</p>
    <p className="px-2">{formatDistance(distance)}</p>
    {isMe && (
      <button
        className="button-remove"
        type="button"
        onClick={() => {
          deleteTrip({ variables: { id: _id } });
          refetch();
        }}
      >
        <i className="fa fa-trash" />
      </button>
    )}
  </div>
);

export const Trips = ({ name, trips, refetch, isMe }) => {
  const [deleteTrip] = useMutation(DELETE_TRIP);
  return (
    <div className="trip-card py-4">
      <h1>{`${name}’s trips`}</h1>
      <h4>
        <Link to="/">Add new trip</Link>
      </h4>
      <div>
        {trips.map((trip, i) => (
          <TripRow
            {...trip}
            // eslint-disable-next-line react/no-array-index-key
            key={`${trip.timestamp}-${i}`}
            deleteTrip={deleteTrip}
            refetch={refetch}
            isMe={isMe}
          />
        ))}
      </div>
    </div>
  );
};
