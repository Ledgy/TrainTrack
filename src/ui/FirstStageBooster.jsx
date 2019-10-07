import React from "react";
import { Route, Switch } from "react-router-dom";

import { Home } from "./Pages/Home.jsx";
import { Profile } from "./Pages/Profile.jsx";

export const FirstStageBooster = ({ data }) => (
  <div test={console.log(data)}>
    <Switch>
      <Route path="/:userId" component={Profile} />
      <Route path="/">
        <Home data={data} />
      </Route>
    </Switch>
  </div>
);
