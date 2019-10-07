import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import netlifyIdentity from "netlify-identity-widget";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { getProfileUrl } from "../format.js";

const open = () => {
  netlifyIdentity.init();
  netlifyIdentity.open();
};

const REGISTER_USER = gql`
  mutation registerUser {
    registerUser
  }
`;

export const Identity = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [registerUser] = useMutation(REGISTER_USER);
  const handleLogin = authenticatedUser => {
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      localStorage.setItem("token", authenticatedUser.token.access_token);
      registerUser();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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
      <button type="button" onClick={open}>
        Login/Signup
      </button>
    );
  }

  return (
    <>
      <Link to={`/${getProfileUrl(user.id)}`}>
        <p className="Header-link">Profile</p>
      </Link>
      <button type="button" onClick={() => netlifyIdentity.logout()}>
        Logout
      </button>
    </>
  );
};
