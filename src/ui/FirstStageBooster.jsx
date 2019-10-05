import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import { Home } from './Pages/Home.jsx';
import { Profile } from './Pages/Profile.jsx'

export const FirstStageBooster = ({ data }) => (
  <div test={console.log(data)}>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path="/profile">
          <Profile name="T‘Pol"/>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
