import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

const GET_LEADERBOARD = gql`
  {
    userNames {
      userId
      name
    }
    leaderboard {
      userId
      distance
    }
  }
`;

export const Leaderboard = () => {
  const { data } = useQuery(GET_LEADERBOARD);
  if (!data) return null;

  const userNames = new Map(data.userNames.map(v => [v.userId, v.name]));
  return (
    <ol>
      {data.leaderboard.map(({ userId, distance }) => (
        <li key={userId}>
          <strong>{userNames.get(userId) || ""}</strong> {distance / 1000} km
        </li>
      ))}
    </ol>
  );
};
