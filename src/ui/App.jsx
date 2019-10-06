import React from "react";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { FirstStageBooster } from "./FirstStageBooster.jsx";

import "./styles/App.css";
import { Identity } from "./identity/Widget.jsx";

import ttLogo from "../static/ttLogo.png";

const client = new ApolloClient({
  uri: "/.netlify/functions/graphql",
  request: operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    });
  }
});

const DataFetcher = ({ render }) => (
  <ApolloProvider client={client}>
    <Query
      query={gql`
        {
          user(userId: 10) {
            name
          }
          userNames {
            userId
            name
          }
          me
        }
      `}
    >
      {({ data }) =>
        data && data.user ? render(data.user) : <div>Loading ...</div>
      }
    </Query>
  </ApolloProvider>
);

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={ttLogo} alt="Train Track Logo" className="logo" />
      <a href="#" className="Header-link">
        Home
      </a>
    </header>
    <DataFetcher render={data => <FirstStageBooster data={data} />} />
    <Identity />
  </div>
);
