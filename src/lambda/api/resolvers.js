const getDistance = require("./distanceApi");

module.exports = api => ({
  Query: {
    reloadFixtures: async () => {
      return api.reloadFixtures();
    },
    hello: async () => "Hello, world!",
    lastTrips: () => api.getLastTrips(),
    statistics: () => api.getStatistics(),
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
      console.log("args", args);
      console.log("context", context);
      if (!context.user.sub || !args.trip) {
        return null;
      }
      const userId = context.user.sub;
      console.log("userId", userId);
      const { origin, destination } = args.trip;
      const distanceResult = await getDistance(
        origin.displayName,
        destination.displayName
      );
      console.log("distanceResult", distanceResult);
      const { distance, originName, destinationName } = distanceResult;
      if (!distance) return null;
      const populatedTrip = {
        ...args.trip,
        userId,
        distance,
        origin: { ...origin, displayName: originName },
        destination: { ...destination, displayName: destinationName }
      };
      console.log("populatedTrip", populatedTrip);
      api.addTrip(populatedTrip);
      return populatedTrip;
    },
    deleteTrip: async (root, args, context) => {
      const trip = api.getTrip(args.id);
      if (trip.userId !== context.user.sub) return null;
      api.deleteTrip(args.id);
      return args.id;
    }
  }
});
