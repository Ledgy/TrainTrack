export const formatDistance = distance =>
  `${Number(Math.round(distance / 1000)).toLocaleString()} km`;
