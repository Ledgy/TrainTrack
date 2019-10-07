export const formatDistance = distance =>
  `${Number(Math.round(distance / 1000)).toLocaleString()} km`;

const km = 0.001;
const kgPerKm = 0.213;
const usdPerKg = 0.2;

export const formatCo2 = distance =>
  `${Math.round(distance * km * kgPerKm).toLocaleString()} kg`;

export const formatMoneySaved = distance =>
  `$${Math.round(distance * km * kgPerKm * usdPerKg).toLocaleString()}`;

export const getProfileUrl = userId => userId.slice(0, 8);
