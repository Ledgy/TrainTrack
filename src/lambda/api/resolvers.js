const sampleLocation = {latitude: 1, longtitude: 1, displayName: "test"};
module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    trip: async (root, args, context) => {
      return {id: args.id,date: new Date(2012, 11, 24)};
    },
    user: async (root, args, context) => {
      return {id: args.id, name: "spock", city: sampleLocation, country: "CH"}
    }
  }
});
