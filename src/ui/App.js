import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { FirstStageBooster } from './FirstStageBooster.jsx';

import "./styles/App.css";
import { Identity } from './identity/Widget.jsx';


const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    })
  }
});

const DataFetcher = ({render}) => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
      {
        user(userId: 10) {
          name
        }
        me
      }
      `}
    >
      {({ data }) => data ? render(data) : <div>Loading...</div>  }
    </Query>
  </ApolloProvider>
);

export const App = () =>  (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">Welcome to Train Track</h1>
    </header>
    <DataFetcher render={data => <FirstStageBooster data={data} />} />
    <Identity />
  </div>
);

