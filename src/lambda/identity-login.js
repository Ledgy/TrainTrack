// const connectToMongoDB = require("./api/db");

export function handler(event, context, callback) {
  const db = null;
  const body = JSON.parse(event.body);
  console.log(`email: ${body.user.email}`);
  console.log(`name:  ${body.user.user_metadata.name}`);

  // TODO: upsert new user

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Login succeeded" })
  });
}
