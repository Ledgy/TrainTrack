import React from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const open = () => {
  netlifyIdentity.init();
  netlifyIdentity.open();
};

export const Identity = () => (
  <button onClick={open}>Login/Signup</button>
)
