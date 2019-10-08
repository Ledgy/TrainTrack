import React, { useEffect } from "react";
import { addTripsToMap, initializeMap } from "../../MapHelpers";

const decodePath = pathString =>
  window.google.maps.geometry.encoding.decodePath(pathString);

export const Map = ({ trips }) => {
  useEffect(() => {
    initializeMap();
    addTripsToMap(
      trips.reduce(
        (res, v) => (v.path ? [...res, decodePath(v.path)] : res),
        []
      )
    );
  }, []);

  return (
    <div
      id="map"
      style={{ width: "100%", height: "400px", borderRadius: "10px" }}
    />
  );
};
