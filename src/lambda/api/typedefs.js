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

  type Statistics {
    trips: Int
    distance: Int
  }

  type Query {
    reloadFixtures: String
    hello: String
    lastTrips: [Trip]
    userNames: [UserName]
    leaderboard: [LeaderboardEntry]
    statistics: Statistics
    userProfile(userId: ID!): UserProfile
    userTrips(userId: ID!): [Trip]
    userStatistics(userId: ID!): Statistics
  }

  input LocationInput {
    latitude: Float
    longitude: Float
    displayName: String
  }

  input TripInput {
    origin: LocationInput
    destination: LocationInput
    timestamp: Int
  }

  type Mutation {
    addTrip(trip: TripInput!): Trip
    deleteTrip(id: String!): String
    registerUser: Boolean
  }
`;
