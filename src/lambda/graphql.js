const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./api/typedefs');
const resolvers = require('./api/resolvers');
const initDbApi = require('./api/db_api');

// eslint-disable-next-line func-names
exports.handler = async function (event, context) {
  const user = context.clientContext && context.clientContext.user;
  const api = await initDbApi();

  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(api),
    context: () => ({ user }),
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};
