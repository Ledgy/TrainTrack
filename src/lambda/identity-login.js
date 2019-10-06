const initDbApi = require("./api/db_api");

exports.handler = async function (event, context, callback) {
  const api = await initDbApi();
  try {
    const body = JSON.parse(event.body);
    console.log(`email: ${body.user.email}`);
    console.log(`name:  ${body.user.user_metadata.name}`);

    // TODO: upsert new user
    api.createLog({ message: 'upsert new user', body, context });
    api.createUser(body.user);

  } catch (err) {
    api.createLog({ message: 'identity error', err });
    console.log({ err });
  }
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: "Login succeeded" })
  });
}
