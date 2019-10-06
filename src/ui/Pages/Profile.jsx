import React from "react";

import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";
import { Map } from "../Components/Map.jsx";

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
        <Map trips={tripsData} />
      </div>
    </div>
  </div>
);
