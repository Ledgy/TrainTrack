const connectToMongoDB = require("./db_client");
const _ = require("./db_helpers");

const internalMongoApi = db => ({
  createLog(payload) {
    return db.collection("logs").insert(payload);
  },
  createUser(payload) {
    return db.collection("users").insert(payload);
  },
  getUser(userId) {
    return db.collection("users").findOne({ userId });
  },
  getUserNames() {
    return db
      .collection("users")
      .find({}, { projection: { userId: 1, name: 1 } })
      .toArray();
  },
  getLastTrips: () =>
    db
      .collection("trips")
      .find()
      .toArray(),
  getUserTrips(userId) {
    return db
      .collection("trips")
      .find({ userId })
      .toArray();
  },
  getTrip(id) {
    return db.collection("trips").findOne({ _id: id });
  },
  deleteTrip(id) {
    db.collection("trips").deleteOne({ _id: id });
  },
  async addTrip(trip) {
    await db.collection("trips").insert(trip);
  },
  getStatistics: async userId =>
    (await db
      .collection("trips")
      .aggregate([
        ...(userId ? [{ $match: { userId } }] : []),
        {
          $group: {
            _id: null,
            trips: { $sum: 1 },
            distance: { $sum: "$distance" }
          }
        }
      ])
      .toArray())[0],
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
