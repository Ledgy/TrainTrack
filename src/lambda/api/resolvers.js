const sampleTrips = require("../../../fixtures/trips.json");
const sampleUser = require("../../../fixtures/users.json");

module.exports = api => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    trips: async (root, args, context) => {
      return args.userId ? sampleTrips.filter(v => v.userId === args.userId) : sampleTrips;
    },
    user: async (root, args, context) => {
      return await api.getUser(args.userId);
    },
    me: async (root, args, context) => {
      return context.user ? context.user.user_metadata.full_name : '';
    }
  }
});

