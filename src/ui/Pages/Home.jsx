import React from "react";
import { MapForm } from "../Components/MapForm.jsx";
import { Leaderboard } from "../Components/Leaderboard.jsx";
import { Map } from "../Components/Map.jsx";

export const Home = ({ data }) => (
  <div>
    <MapForm data={data} />
    <Leaderboard data={data} />
    <Map data={data} />
  </div>
);
