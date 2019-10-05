module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    location: async () => {
      return {latitude: 1, longtitude: 1, displayName: "test"};
    }
  }
});
