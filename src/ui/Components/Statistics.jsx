import React from "react";

const getStatistic = ({ title, value }) => (
  <div className="px-4">
    <h4 className="my-2">{value}</h4>
    <div>{title}</div>
  </div>
);

const statsData = [
  {
    title: "Total trips",
    value: 47
  },
  {
    title: "Distance (km)",
    value: "12‘301"
  },
  {
    title: "C02 saved",
    value: "37.3 tons"
  },
  {
    title: "Money saved",
    value: "CHF 23‘452"
  }
];

export const Statistics = () => {
  return (
    <section>
      <h1>Statistics</h1>
      <div className="d-inline-flex">
        {statsData.map(stat => getStatistic({ ...stat }))}
      </div>
    </section>
  );
};
