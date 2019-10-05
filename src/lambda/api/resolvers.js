const sampleLocation = {latitude: 1, longtitude: 1, displayName: "test"};
module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    location: async () => {
      return sampleLocation;
    },
    trip: async () => {
      return {date: new Date(2012, 11, 24)};
    },
    user: async () => {
      return {userId: "wqdqwwd", name: "spock", city: sampleLocation, country: "CH"}
    }
  }
});
