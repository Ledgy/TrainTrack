import React from "react";
import { useQuery } from "@apollo/react-hooks";

import gql from "graphql-tag";
import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";
import { Map } from "../Components/Map.jsx";
import { Row, Col } from "../Components/Utilities.jsx";
import { MapForm } from "../Components/MapForm.jsx";

export const GET_USER_DETAILS = gql`
  query UserDetails($userId: ID!) {
    userProfile(userId: $userId) {
      userId
      name
    }
    userTrips(userId: $userId) {
      _id
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
      path
    }
    userStatistics(userId: $userId) {
      trips
      distance
    }
  }
`;

export const Profile = ({ match, refetch: refetchAppData }) => {
  const { userId } = match.params;
  const { data, refetch } = useQuery(GET_USER_DETAILS, {
    variables: { userId }
  });
  if (!data) return null;
  const isMe = userId === localStorage.getItem("userId");
  return (
    <div className="profile">
      <Row>
        <Statistics {...data.userStatistics} />
      </Row>
      <Row className="my-4">
        <Col className="col col-xs-12">
          <MapForm refetch={refetch} refetchAppData={refetchAppData} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col className="col-sm-12 col-lg-6">
          <Trips
            trips={data.userTrips}
            name={data.userProfile ? data.userProfile.name : "Unknown user"}
            refetch={refetch}
            refetchAppData={refetchAppData}
            isMe={isMe}
          />
        </Col>
        <Col className="col-sm-12 col-lg-6">
          <Map trips={data.userTrips} />
        </Col>
      </Row>
    </div>
  );
};
