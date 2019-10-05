const { gql } = require("apollo-server-lambda");

module.exports = gql`

  type LocationType {
    latitude: Float
    longtitude: Float
    displayName: String
  }

  type Query {
    hello: String
    location: LocationType
  }
`;
