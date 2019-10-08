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
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [registerUser] = useMutation(REGISTER_USER);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setUserId(null);
  };

  const handleLogin = async authenticatedUser => {
    try {
      if (authenticatedUser) {
        const token = await authenticatedUser.jwt();
        const shortId = getShortId(authenticatedUser.id);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", shortId);
        setUserId(shortId);
        registerUser();
      }
    } catch (e) {
      console.log("Login failed", e);
      handleLogout();
    }
  };

  useEffect(() => {
    netlifyIdentity.on("init", handleLogin);
    netlifyIdentity.on("login", handleLogin);
    netlifyIdentity.on("logout", handleLogout);
    netlifyIdentity.init();
  }, []);

  if (!userId) {
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
  const isProfile = router.location.pathname.includes(userId);
  return (
    <div className="d-flex">
      {!isProfile && (
        <Link to={`/${getShortId(userId)}`}>
          <p className="Header-link">Profile</p>
        </Link>
      )}
      {!isHomeRoute && (
        <Link to={homeRoute}>
          <p className="Header-link">Home</p>
        </Link>
      )}

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
