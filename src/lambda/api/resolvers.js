const getDistance = require("./distanceApi");

module.exports = api => ({
  Query: {
    reloadFixtures: async (root, args, context) => {
      return api.reloadFixtures();
    },
    hello: async () => "Hello, world!",
    lastTrips: () => api.getLastTrips(),
    userTrips: (root, args) => api.getUserTrips(args.userId),
    userStatistics: (root, args) => api.getStatistics(args.userId),
    userProfile: async (root, args) => api.getUser(args.userId),
    userNames: async () => {
      const names = await api.getUserNames();
      return names;
    },
    leaderboard: async () => api.getLeaderboard()
  },
  Mutation: {
    addTrip: async (root, args, context) => {
      if (
        (!context.user_metadata && process.env.ENV !== "development") ||
        !args.trip
      ) {
        return null;
      }
      const userId =
        (context.user_metadata && context.user_metadata.id) || "21";

      const { origin, destination } = args.trip;
      const distanceResult = await getDistance(
        origin.displayName,
        destination.displayName
      );
      const { distance, originName, destinationName } = distanceResult;
      if (!distance) return null;
      const populatedTrip = {
        ...args.trip,
        userId,
        distance,
        origin: { ...origin, displayName: originName },
        destination: { ...destination, displayName: destinationName }
      };
      api.addTrip(populatedTrip);
      return populatedTrip;
    }
  }
});
