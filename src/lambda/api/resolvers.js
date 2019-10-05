const sampleTrips = require("../../../fixtures/trips.json");
const sampleUser = require("../../../fixtures/users.json");


module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    trip: async (root, args, context) => {
      return {...sampleTrips[0], userId: args.userId};
    },
    user: async (root, args, context) => {
      return {...sampleUser[0], userId: args.userId};
    }
  }
});
