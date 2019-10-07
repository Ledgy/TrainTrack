import React, { useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { Link } from "react-router-dom";

const open = () => {
  netlifyIdentity.init();
  netlifyIdentity.open();
};

export const Identity = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const updateToken = authenticatedUser => {
    if (authenticatedUser) {
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
    }
  };

  netlifyIdentity.on("init", updateToken);
  netlifyIdentity.on("login", updateToken);

  if (!user) {
    return (
      <button type="button" onClick={open}>
        Login/Signup
      </button>
    );
  }
  return (
    <Link to={`/${user.id}`}>
      <p className="Header-link">Profile</p>
    </Link>
  );
};
