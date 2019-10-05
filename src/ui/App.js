import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import "./styles/App.css";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const LambdaDemo = () => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          hello
        }
      `}
    >
      {({ data }) => <div>A greeting from the server: {data.hello}</div>}
    </Query>
  </ApolloProvider>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Train Track</h1>
        </header>
        <LambdaDemo />
      </div>
    );
  }
}

export default App;
