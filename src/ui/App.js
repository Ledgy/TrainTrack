import React, { Component } from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import "./styles/App.css";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql"
});

const DataFetcher = ({render}) => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          hello
        }
      `}
    >
      {({ data }) =>  data ? render(data) : <div>Loading...</div>}
    </Query>
  </ApolloProvider>
);

export const App = () =>  (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Train Track</h1>
    </header>
    <DataFetcher render={data => <div>{data.hello}</div>} />
  </div>
);

