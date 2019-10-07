import React from "react";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";
import { Map } from "../Components/Map.jsx";

export const GET_USER_DETAILS = gql`
  query UserDetails($userId: ID!) {
    userProfile(userId: $userId) {
      userId
      name
    }
    userTrips(userId: $userId) {
      origin {
        displayName
        latitude
        longitude
      }
      destination {
        displayName
        latitude
        longitude
      }
      timestamp
      distance
    }
    userStatistics(userId: $userId) {
      trips
      distance
    }
  }
`;

export const Profile = ({ match }) => {
  const { data } = useQuery(GET_USER_DETAILS, {
    variables: { userId: match.params.userId }
  });
  if (!data) return null;
  return (
    <div className="profile">
      <div className="row">
        <div className="col col-xs-12">
          <Statistics {...data.userStatistics} />
        </div>
      </div>
      <div className="row">
        <div className="col col-sm-12 col-lg-6">
          <Trips trips={data.userTrips} name={data.userProfile.name} />
        </div>
        <div className="col col-sm-12 col-lg-6">
          <Map trips={data.userTrips} />
        </div>
      </div>
    </div>
  );
};
