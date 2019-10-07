import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import { Home } from "./Pages/Home.jsx";
import { Profile } from "./Pages/Profile.jsx";
import { Identity } from "./identity/Widget.jsx";

import ttLogo from "../static/ttLogo.png";

export const FirstStageBooster = ({ data }) => (
  <BrowserRouter>
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <img src={ttLogo} alt="Train Track Logo" className="logo" />
        </Link>
        <Identity />
      </header>
      <Switch>
        <Route path="/:userId" component={Profile} />
        <Route path="/">
          <Home data={data} />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>
);
