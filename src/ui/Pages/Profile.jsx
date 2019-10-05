import React from 'react';

import { Statistics } from '../Components/Statistics.jsx'

export const Profile = ({name}) => (
  <div>
    <section>
      <h1>{name}</h1>
      <Statistics />
      <h3>Trips</h3>
      <h3>Map</h3>
    </section>
  </div>
);
