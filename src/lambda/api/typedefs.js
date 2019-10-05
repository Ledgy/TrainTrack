const { gql } = require("apollo-server-lambda");

module.exports = gql`

  type LocationType {
    latitude: Float
    longtitude: Float
    displayName: String
  }

  type Trip {
    userId: ID
    origin: LocationType
    destination: LocationType
    date: String
  }

  type userProfile {
    userId: ID
    name: String
    city: LocationType
    country: String
  }

  type Query {
    hello: String
    location: LocationType
    trip: Trip
    user: userProfile
  }
`;
