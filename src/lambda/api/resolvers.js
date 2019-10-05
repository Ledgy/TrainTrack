module.exports = db => ({
  Query: {
    hello: async (root, args, context) => {
      return "Hello, world!";
    },
    allTodos: async () =>
      await db
        .collection("todos")
        .find()
        .toArray()
  }
});
