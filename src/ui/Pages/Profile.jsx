import React from "react";

import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";

export const Profile = () => (
  <div>
    <div className="row">
      <div className="col col-xs-12">
        <Statistics />
      </div>
    </div>
    <div className="row">
      <div className="col col-sm-12 col-lg-6">
        <Trips />
      </div>
      <div className="col col-sm-12 col-lg-6">
        <h3>Map</h3>
      </div>
    </div>
  </div>
);
