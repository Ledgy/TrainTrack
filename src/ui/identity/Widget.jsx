import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import netlifyIdentity from "netlify-identity-widget";
import gql from "graphql-tag";
import { Link, withRouter } from "react-router-dom";

import { getShortId } from "../format.js";

const REGISTER_USER = gql`
  mutation registerUser {
    registerUser
  }
`;

export const Identity = withRouter(router => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [registerUser] = useMutation(REGISTER_USER);
  const handleLogin = authenticatedUser => {
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      localStorage.setItem("token", authenticatedUser.token.access_token);
      localStorage.setItem("userId", getShortId(authenticatedUser.id));
      registerUser();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    netlifyIdentity.on("init", handleLogin);
    netlifyIdentity.on("login", handleLogin);
    netlifyIdentity.on("logout", handleLogout);
    netlifyIdentity.init();
  }, []);

  if (!user) {
    return (
      <div className="d-flex">
        <button type="button" onClick={() => netlifyIdentity.open("signup")}>
          Signup
        </button>
        <button
          type="button"
          className="ml-4"
          onClick={() => netlifyIdentity.open("login")}
        >
          Login
        </button>
      </div>
    );
  }
  const homeRoute = "/";
  const isHomeRoute = router.location.pathname === homeRoute;
  return (
    <div className="d-flex">
      <Link to={isHomeRoute ? `/${getShortId(user.id)}` : homeRoute}>
        <p className="Header-link">{isHomeRoute ? "Profile" : "Home"}</p>
      </Link>

      <button
        type="button"
        className="ml-4"
        onClick={() => netlifyIdentity.logout()}
      >
        Logout
      </button>
    </div>
  );
});
