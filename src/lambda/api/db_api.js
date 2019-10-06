const connectToMongoDB = require("./db_client");
const sampleTrips = require("../../../fixtures/trips.json");
const sampleUsers = require("../../../fixtures/users.json");
const _ = require("./db_helpers");

const internalMongoApi = db => ({
  async createLog(payload) {
    return await db.collection("logs").insert(payload);
  },
  async createUser(payload) {
    return await db.collection("users").insert(payload);
  },
  async getUser(userId) {
    return await db.collection("users").findOne({ userId });
  },
  async getUserNames(userIds) {
    return await db
      .collection("users")
      .find({}, { projection: { userId: 1, name: 1 } })
      .toArray();
  },
  getLastTrips: () =>
    db
      .collection("trips")
      .find()
      .toArray(),
  async getUserTrips(userId) {
    return await db
      .collection("trips")
      .find({ userId })
      .toArray();
  },
  async addTrip(trip) {
    await db.collection("trips").insert(trip);
  },
  async reloadFixtures() {
    if (!db) return "db not available";
    _.FIXTURES.forEach(([name, sampleData]) => {
      _.resetCollection(db, name, sampleData);
    });
    return "done";
  },
  getLeaderboard: async () =>
    db
      .collection("trips")
      .aggregate([
        { $group: { _id: "$userId", distance: { $sum: "$distance" } } },
        { $sort: { distance: -1 } },
        { $project: { _id: 0, userId: "$_id", distance: 1 } }
      ])
      .toArray()
});

module.exports = async () => {
  const hasDB = !!process.env.DB_URI;
  const mongoClient = hasDB ? await connectToMongoDB() : null;
  return internalMongoApi(mongoClient);
};
