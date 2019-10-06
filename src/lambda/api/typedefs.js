const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Location {
    latitude: Float
    longitude: Float
    displayName: String
  }

  type Trip {
    userId: ID
    origin: Location
    destination: Location
    timestamp: Int
    distance: Int
    roundtrip: Boolean
  }

  type UserProfile {
    userId: ID
    name: String
    city: Location
    country: String
  }

  type UserName {
    userId: ID
    name: String
  }

  type LeaderboardEntry {
    userId: ID
    distance: Int
  }

  type Query {
    reloadFixtures: String
    hello: String
    user(userId: ID!): UserProfile
    userNames: [UserName]
    lastTrips: [Trip]
    myTrips: [Trip]
    me: String
    leaderboard: [LeaderboardEntry]
  }

  input LocationInput {
    latitude: Float
    longitude: Float
    displayName: String
  }

  input TripInput {
    userId: ID
    origin: LocationInput
    destination: LocationInput
    timestamp: Int
    distance: Int
    roundtrip: Boolean
  }

  type Mutation {
    addTrip(trip: TripInput!): Trip
  }
`;
