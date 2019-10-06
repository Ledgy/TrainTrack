const sampleTrips = require("../../../fixtures/trips.json");
const sampleUsers = require("../../../fixtures/users.json");

const FIXTURES = Object.freeze([
  ['trips', sampleTrips],
  ['users', sampleUsers]
]);

const resetCollection = async (db, name, sampleData) => {
  try {
    await db.collection(name).drop();
  } catch (err) {
    console.log(`Error dropping collection ${name}`, { err });
  }
  await db.collection(name).insert(sampleData);
};

module.exports = {
  FIXTURES,
  resetCollection
};
