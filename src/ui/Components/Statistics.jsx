import React from "react";
import trainIcon from "../../static/trainIcon.png";
import { formatDistance, formatCo2, formatMoneySaved } from "../format";

const getStatisticsBox = ({ title, value, icon }) => (
  <div className="px-4 statistics-box" key={title}>
    <div className="statistics-value">
      <img src={icon} alt="Train Icon" />
      <h4 className="my-2">{value}</h4>
    </div>
    <div className="statistics-title">{title}</div>
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
    icon: trainIcon
  },
  {
    title: "C02 saved",
    value: formatCo2(distance),
    icon: trainIcon
  },
  {
    title: "Money saved",
    value: formatMoneySaved(distance),
    icon: trainIcon
  }
];

export const Statistics = ({ trips, distance }) => {
  return (
    <div className="d-inline-flex">
      {getStats(trips, distance).map(stat => getStatisticsBox({ ...stat }))}
    </div>
  );
};
