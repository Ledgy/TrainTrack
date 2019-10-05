# Netlify Functions: MongoDB + GraphQL

A Netlify functions template for Apollo Server GraphQL API with MongoDB.

## Add to Existing Project
cd into your project directory and run `netlify functions:create` to create a new function.

select `*** Clone template from Github URL ***` from the list of templates.

In the URL field enter `https://github.com/akshayymahajan/netlify-functions-mongodb-graphql/tree/master/functions/mongodb-graphql`

Netlify CLI will download the function and install all the dependencies in your project.


## Local Development
Clone the repository and run the following commands to install all the dependencies:
```
cd netlify-functions-mongodb-graphql/functions/mongodb-graphql
npm i
```

### Setup Environment Variables in your Netlify Site Settings

Login to your [Netlify](https://app.netlify.com) account. Go to and select your site, then go to:
```Site Settings > Build & Deploy > Environment```

Then click on **Edit Variables** and setup the following variables:

```
DB_URI = <your-mongodb-connection-uri>
DB_NAME = <mongodb-database-name>
```

### typedefs.js

Edit ```typedefs.js``` according to your GraphQL schema.
```
type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}

type Query {
  allTodos: [Todo]
}
```

### resolvers.js

Edit ```resolvers.js``` to return the resolvers for your schema.
```
{
  Query: {
    allTodos: async () =>
      await db
        .collection("todos")
        .find()
        .toArray()
  }
}
```

### Run Dev Server

Open a terminal and run ```netlify dev``` to start the dev server. Netlify Dev will automatically fetch and inject the environment variables from your Netlify Site Settings and start a local dev sever on http://localhost:8888. To access GraphQL Playground, visit http://localhost:8888/.netlify/functions/mongodb-graphql in a browser window.
