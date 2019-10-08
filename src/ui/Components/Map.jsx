import React, { useEffect } from "react";
import {
  addTripsToMap,
  initializeMap,
  convertTripsToPaths
} from "../../MapHelpers";

export const Map = ({ trips }) => {
  useEffect(() => {
    initializeMap();
    addTripsToMap(convertTripsToPaths(trips));
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    />
  );
};
