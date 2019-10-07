import React from "react";
import { MapForm } from "../Components/MapForm.jsx";
import { Leaderboard } from "../Components/Leaderboard.jsx";
import { Map } from "../Components/Map.jsx";
import { Statistics } from "../Components/Statistics.jsx";
import { Row, Col } from "../Components/Utilities.jsx";

export const Home = ({ data }) => (
  <div className="home">
    <Row>
      <Statistics {...data.statistics} />
    </Row>
    <Row className="my-4">
      <Col className="col col-xs-12">
        <MapForm data={data} />
      </Col>
    </Row>
    <Row className="my-4">
      <Col className="col col-12 col-lg-4">
        <Leaderboard data={data} />
      </Col>
      <Col className="col col-12 col-lg-8">
        <Map trips={data.lastTrips} />
      </Col>
    </Row>
  </div>
);
