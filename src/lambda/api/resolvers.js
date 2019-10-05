const sampleTrips = require("../../../fixtures/trips.json");
const sampleUser = require("../../../fixtures/users.json");


module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    trips: async (root, args, context) => {
      return args.userId ? sampleTrips.filter(v => v.userId === args.userId) : sampleTrips;
    },
    user: async (root, args, context) => {
      return sampleUser.find(v => v.userId === args.userId)
    }
  }
});
