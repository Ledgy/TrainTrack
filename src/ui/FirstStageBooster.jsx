import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Home } from "./Pages/Home.jsx";
import { Profile } from "./Pages/Profile.jsx";

export const FirstStageBooster = ({ data }) => (
  <div test={console.log(data.trips)}>
    <BrowserRouter>
      <Switch>
        <Route path="/profile">
          <Profile name="T‘Pol" tripsData={data.trips} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
