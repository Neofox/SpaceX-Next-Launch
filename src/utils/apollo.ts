import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { GRAPHQL_URL } from "./env";

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache
});
