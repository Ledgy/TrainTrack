import React from "react";
import trainIcon from "../../static/trainIcon.png";

const getTrip = ({ origin, destination, date, distance }, i) => (
  <div className="px-4 d-inline-flex trip-box" key={i}>
    <p className="px-2">{origin}</p>
    <img src={trainIcon} alt="Train Icon" />
    <p className="px-2">{destination}</p>
    <p className="px-2">{date}</p>
    <p className="px-2">{distance}</p>
  </div>
);

const tripsData = [
  {
    origin: "Nice, France",
    destination: "Barcelona, Spain",
    date: "28.05.2019",
    distance: "1'254 km"
  },
  {
    origin: "Nice, France",
    destination: "Barcelona, Spain",
    date: "28.05.2019",
    distance: "1'254 km"
  },
  {
    origin: "Nice, France",
    destination: "Barcelona, Spain",
    date: "28.05.2019",
    distance: "1'254 km"
  },
  {
    origin: "Nice, France",
    destination: "Barcelona, Spain",
    date: "28.05.2019",
    distance: "1'254 km"
  }
];

export const Trips = () => {
  return (
    <section className="trip-card py-4 my-2">
      <h1>My trips</h1>
      <div>{tripsData.map((trip, i) => getTrip({ ...trip }, i))}</div>
    </section>
  );
};
