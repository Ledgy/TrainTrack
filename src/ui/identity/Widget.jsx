import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const open = () => {
  netlifyIdentity.init();
  netlifyIdentity.open();
};

const updateToken = (user) => { if (user) localStorage.setItem('token', user.token.access_token) };

netlifyIdentity.on('init', updateToken);
netlifyIdentity.on('login', updateToken);

export const Identity = () => (
  <button onClick={open}>Login/Signup</button>
)
