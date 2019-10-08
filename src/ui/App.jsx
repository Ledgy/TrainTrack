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

const targetBlank = { target: "_blank", rel: "noopener noreferrer" };
const Footer = () => (
  <footer className="p-1 text-center">
    Engineered with lots of{" "}
    <span role="img" aria-label="love">
      👾🌴🍕❤️
    </span>{" "}
    by the{" "}
    <a href="https://ledgy.com/about-us/" {...targetBlank}>
      Ledgy® team
    </a>{" "}
    | See the project
    <a href="https://github.com/Ledgy/TrainTrack" {...targetBlank}>
      {" "}
      repo
    </a>{" "}
    | Read our{" "}
    <a href="https://ledgy.com/traintrack/" {...targetBlank}>
      blog article
    </a>
  </footer>
);

export const App = () => (
  <>
    <ApolloProvider client={client}>
      <Query query={GET_APP_DATA}>
        {({ data, refetch }) =>
          data ? (
            <FirstStageBooster data={data} refetch={refetch} />
          ) : (
            <div>Loading…</div>
          )
        }
      </Query>
    </ApolloProvider>
    <Footer />
  </>
);
