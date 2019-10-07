import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import { formatDistance, getProfileUrl } from "../format.js";
import { Row, Col } from "./Utilities.jsx";

const GET_LEADERBOARD = gql`
  {
    userNames {
      userId
      name
    }
    leaderboard {
      userId
      distance
    }
  }
`;

export const Leaderboard = () => {
  const { data } = useQuery(GET_LEADERBOARD);
  if (!data) return null;

  const userNames = new Map(data.userNames.map(v => [v.userId, v.name]));
  return (
    <div className="leaderboard p-4">
      <h3 className="text-center pt-0">Leaderboard</h3>
      <div className="leaderboard-entries">
        {data.leaderboard.map(({ userId, distance }, i) => (
          <Row key={userId} className="my-2 justify-content-center">
            <Col className="col-1">{i + 1}.</Col>
            <Col className="col-6">
              <Link to={`/${getProfileUrl(userId)}`}>
                {userNames.get(userId) || ""}
              </Link>
            </Col>
            <Col className="col-4">{formatDistance(distance)}</Col>
          </Row>
        ))}
      </div>
    </div>
  );
};
