import React from 'react';

import { Statistics } from '../Components/Statistics.jsx'
import { Trips } from '../Components/Trips.jsx'

export const Profile = ({name}) => (
  <div>
    <section>
      <h1>{name}</h1>
      <Statistics />
      <Trips />
      <h3>Map</h3>
    </section>
  </div>
);
