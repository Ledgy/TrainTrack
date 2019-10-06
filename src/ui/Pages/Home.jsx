import React from "react";
import { MapForm } from "../Components/MapForm.jsx";
import { Leaderboard } from "../Components/Leaderboard.jsx";
import { Map } from "../Components/Map.jsx";

export const Home = () => (
  <div>
    <MapForm />
    <Leaderboard />
    <Map />
  </div>
);
