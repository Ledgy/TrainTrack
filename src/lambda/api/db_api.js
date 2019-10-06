const connectToMongoDB = require("./db_client");
const sampleTrips = require("../../../fixtures/trips.json");
const sampleUsers = require("../../../fixtures/users.json");

const internalMongoApi = db => ({
  async getUser(userId) {
    return sampleUsers.find(v => v.userId === userId);
  },
  async getUserNames(userIds) {},
  async getAllTrips() {},
  async getUserTrips(userId) {},
  async addTrip(trip) {}
});

module.exports = async () => {
  // const mongoClient = await connectToMongoDB();
  const mongoClient = null;
  return internalMongoApi(mongoClient);
};
