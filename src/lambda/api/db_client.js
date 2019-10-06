const { MongoClient } = require("mongodb");

const URI = process.env.DB_URI;
const { DB_NAME } = process.env;

let cachedDb = null;
module.exports = () => {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(URI, { useNewUrlParser: true }).then(client => {
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  });
};
