const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Location {
    latitude: Float
    longtitude: Float
    displayName: String
  }

  type Trip {
<<<<<<< HEAD
    id: ID
    userId: String
    origin: Location
    destination: Location
    distance: Int
    date: Int
=======
    userId: ID
    origin: LocationType
    destination: LocationType
    timestamp: String
    distance: Int
>>>>>>> use fixtures for sample query data
    roundtrip: Boolean
  }

  type UserProfile {
    id: ID
    name: String
    city: Location
    country: String
  }

  type Query {
    hello: String
    user(id: ID!): UserProfile
    trip(id: ID!): Trip
  }
`;
