import React from "react";
import { addTripsToMap } from "../../MapHelpers";

export const Map = ({ trips }) => {
  addTripsToMap(trips);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    />
  );
};
