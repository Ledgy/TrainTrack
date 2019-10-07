import { gql } from "apollo-boost";

export const GET_APP_DATA = gql`
{
  user(userId: 10) {
    name
  }
  userNames {
    userId
    name
  }
  statistics {
    trips
    distance
  }
  me
  lastTrips {
    origin {
      displayName
      latitude
      longitude
    }
    destination {
      displayName
      latitude
      longitude
    }
    timestamp
    distance
  }
  myTrips {
    origin {
      displayName
      latitude
      longitude
    }
    destination {
      displayName
      latitude
      longitude
    }
    timestamp
    distance
  }
}
`;
