import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import { FirstStageBooster } from "./FirstStageBooster.jsx";

import "./styles/App.css";
import { GET_APP_DATA } from "./queries";

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

export const App = () => (
  <>
    <ApolloProvider client={client}>
      <Query query={GET_APP_DATA}>
        {({ data }) =>
          data ? <FirstStageBooster data={data} /> : <div>Loading…</div>
        }
      </Query>
    </ApolloProvider>
    <footer className="p-1 text-center">
      Engineered with lots of{" "}
      <span role="img" aria-label="love">
        👾 🌴 🍕 ❤️
      </span>{" "}
      by the Ledgy® team
    </footer>
  </>
);
