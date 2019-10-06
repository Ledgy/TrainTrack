import React from "react";

import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";

export const Profile = ({ name, tripsData }) => (
  <div className="profile">
    <div className="row">
      <div className="col col-xs-12">
        <Statistics name={name} />
      </div>
    </div>
    <div className="row">
      <div className="col col-sm-12 col-lg-6">
        <Trips tripsData={tripsData} />
      </div>
      <div className="col col-sm-12 col-lg-6">
        <h3>Map</h3>
      </div>
    </div>
  </div>
);
