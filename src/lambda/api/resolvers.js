const sampleTrips = require("../../../fixtures/trips.json");

module.exports = api => ({
  Query: {
    reloadFixtures: async (root, args, context) => {
      return api.reloadFixtures();
    },
    hello: async () => "Hello, world!",
    trips: async (root, args) =>
      args.userId ? api.getUserTrips(args.userId) : api.getAllTrips(),

    user: async (root, args) => api.getUser(args.userId),
    userNames: async () => {
      const names = await api.getUserNames();
      return names;
    },
    me: async (root, args, context) => {
      return context.user_metadata ? context.user_metadata.full_name : "";
    },
    leaderboard: async () => api.getLeaderboard()
  },
  Mutation: {
    addTrip: (root, args, context) => {
      if (
        (!context.user_metadata && process.env.ENV !== "development") ||
        !args.trip
      ) {
        return;
      }
      api.addTrip(args.trip);
      return args.trip;
    }
  }
});
