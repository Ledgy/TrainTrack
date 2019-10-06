import React from "react";
import { MapForm } from "../Components/MapForm.jsx";
import { Leaderboard } from "../Components/Leaderboard.jsx";
import { Map } from "../Components/Map.jsx";
import { Statistics } from "../Components/Statistics.jsx";

export const Home = ({ data }) => (
  <div className="home">
    <div className="row">
      <div className="col col-xs-12">
        <Statistics {...data.statistics} />
      </div>
    </div>
    <div className="row">
      <div className="col col-xs-12">
        <MapForm data={data} />
      </div>
    </div>
    <div className="row">
      <div className="col col-12 col-lg-4">
        <Leaderboard data={data} />
      </div>
      <div className="col col-12 col-lg-8">
        <Map trips={data.lastTrips} />
      </div>
    </div>
  </div>
);
