const sampleTrips = require("../../../fixtures/trips.json");

module.exports = api => ({
  Query: {
    hello: async () => "Hello, world!",
    trips: async (root, args) =>
      args.userId
        ? sampleTrips.filter(v => v.userId === args.userId)
        : sampleTrips,
    user: async (root, args) => api.getUser(args.userId),
    me: async (root, args, context) =>
      context.user ? context.user.user_metadata.full_name : ""
  }
});
