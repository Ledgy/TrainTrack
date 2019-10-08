import React from "react";
import { Link } from "react-router-dom";

import { Leaderboard } from "../Components/Leaderboard.jsx";
import { Map } from "../Components/Map.jsx";
import { Statistics } from "../Components/Statistics.jsx";
import { Row, Col } from "../Components/Utilities.jsx";
import { getShortId } from "../format.js";

export const Home = ({ data }) => {
  const userId = localStorage.getItem("userId");
  return (
    <div className="home">
      <Row>
        <Statistics {...data.statistics} />
      </Row>
      <Row className="my-4">
        <Col className="col col-12 col-lg-4">
          <Leaderboard data={data} />
        </Col>
        <Col className="col col-12 col-lg-8">
          <div className="position-relative">
            <Map trips={data.lastTrips} />
            {userId && (
              <Link
                to={`/${getShortId(userId)}`}
                className="position-absolute"
                style={{ top: 0, left: 0 }}
              >
                <button type="button">Add Trip</button>
              </Link>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};
