import React from "react";

import { Statistics } from "../Components/Statistics.jsx";
import { Trips } from "../Components/Trips.jsx";
import { Map } from "../Components/Map.jsx";

export const Profile = ({ trips, statistics }) => (
  <div className="profile">
    <div className="row">
      <div className="col col-xs-12">
        <Statistics {...statistics} />
      </div>
    </div>
    <div className="row">
      <div className="col col-sm-12 col-lg-6">
        <Trips tripsData={trips} />
      </div>
      <div className="col col-sm-12 col-lg-6">
        <Map trips={trips} />
      </div>
    </div>
  </div>
);
