import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import { Home } from "./Pages/Home.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { Identity } from "./identity/Widget.jsx";

import ttLogo from "../static/ttLogo.png";

export const FirstStageBooster = ({ data, refetch }) => (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={ttLogo} alt="Train Track Logo" className="logo" />
        </Link>
        <Identity />
      </header>
      <Switch>
        <Route
          path="/:userId"
          component={props => <Profile {...props} refetch={refetch} />}
        />
        <Route path="/">
          <Home data={data} refetch={refetch} />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);
