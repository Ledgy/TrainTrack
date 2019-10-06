const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type Location {
    latitude: Float
    longtitude: Float
    displayName: String
  }

  type Trip {
    userId: ID
    origin: Location
    destination: Location
    date: Int
    distance: Int
    roundtrip: Boolean
  }

  type UserProfile {
    userId: ID
    name: String
    city: Location
    country: String
  }

  type Query {
    hello: String
    user(userId: ID!): UserProfile
    trips(userId: ID): [Trip]
    me: String
  }
`;
