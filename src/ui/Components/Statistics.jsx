import React from "react";
import trainIcon from "../../static/trainIcon.png";
import backpackIcon from "../../static/backpackIcon.png";
import offsetIcon from "../../static/offsetIcon.png";
import saveIcon from "../../static/saveIcon.png";
import { formatDistance, formatCo2, formatMoneySaved } from "../format";
import { Col } from "./Utilities.jsx";

const StatisticsBox = ({ title, value, icon }) => (
  <div className="px-3 statistics-box align-self-center">
    <div className="d-flex align-items-center justify-content-center mb-2">
      <img src={icon} alt={title} height="45px" className="mr-2" />
      {value && <h2>{value}</h2>}
    </div>
    <div>{title}</div>
  </div>
);

const getStats = (trips, distance) => [
  {
    title: "Total trips",
    value: trips,
    icon: trainIcon
  },
  {
    title: "Distance",
    value: formatDistance(distance),
    icon: backpackIcon
  },
  {
    title: "C02 saved",
    value: formatCo2(distance),
    icon: saveIcon
  },
  {
    title: "Money saved",
    value: formatMoneySaved(distance),
    icon: offsetIcon
  }
];

export const Statistics = ({ trips, distance }) => {
  if (!distance) {
    return null;
  }
  return getStats(trips, distance).map(stat => (
    <Col className="col-6 col-lg-3 mt-4" key={stat.title}>
      <StatisticsBox {...stat} />
    </Col>
  ));
};
