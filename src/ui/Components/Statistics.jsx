import React from 'react';
import trainIcon from '../../static/trainIcon.png'

const getStatisticsBox = ({ title, value, icon }) => (
  <div className="px-4 statistics-box">
    <div className="statistics-value">
      <img src={icon} alt="Train Icon" />
      <h4 className="my-2">{value}</h4>
    </div>
    <div className="statistics-title">{title}</div>
  </div>
);

const statsData = [
  {
    title: "Total trips",
    value: 47,
    icon: trainIcon
  },
  {
    title: "Distance (km)",
    value: "12‘301",
    icon: trainIcon
  },
  {
    title: "C02 saved",
    value: "37.3 tons",
    icon: trainIcon
  },
  {
    title: "Money saved",
    value: "CHF 23‘452",
    icon: trainIcon
  },
];

export const Statistics = () => {
  return (
    <section>
      <h1>Statistics</h1>
      <div className="d-inline-flex">
        {statsData.map(stat => (
          getStatisticsBox({...stat})
        ))}
      </div>
    </section>
  );
};

