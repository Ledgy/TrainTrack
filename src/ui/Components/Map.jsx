import React, { useEffect } from "react";
import { addTripsToMap, initializeMap } from "../../MapHelpers";

export const Map = ({ trips }) => {
  useEffect(() => {
    setTimeout(() => {
      initializeMap();
      addTripsToMap(trips);
    }, 500);
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    />
  );
};
