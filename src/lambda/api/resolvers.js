const getDistance = require("./distanceApi");

module.exports = api => ({
  Query: {
    reloadFixtures: async (root, args, context) => {
      return api.reloadFixtures();
    },
    hello: async () => "Hello, world!",
    lastTrips: () => api.getLastTrips(),
    myTrips: async (root, args, context) => {
      return context.user ? api.getUserTrips(context.user.sub) : [];
    },
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
    addTrip: async (root, args, context) => {
      if (
        (!context.user_metadata && process.env.ENV !== "development") ||
        !args.trip
      ) {
        return;
      }
      const userId =
        (context.user_metadata && context.user_metadata.id) || "21";

      const { origin, destination } = args.trip;
      const distanceResult = await getDistance(
        origin.displayName,
        destination.displayName
      );
      const { distance, originName, destinationName } = distanceResult;
      if (!distance) return;
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
