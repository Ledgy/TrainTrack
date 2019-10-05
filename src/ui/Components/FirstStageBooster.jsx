import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

const Home = () => <div>Home!</div>;

const Profile = () => <div>Profile!</div>;


export const FirstStageBooster = ({data}) => (
  <div test={console.log(data)}>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Switch>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);
