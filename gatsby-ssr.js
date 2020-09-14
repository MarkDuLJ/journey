import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import fetch from "isomorphic-fetch";

// const link = createHttpLink({
//   fetch,
//   uri: "https://countries.trevorblades.com",
// });

const client = new ApolloClient({
  fetch,
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element} </ApolloProvider>
);
