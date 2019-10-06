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
  }
});
