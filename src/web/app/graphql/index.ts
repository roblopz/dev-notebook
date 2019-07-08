import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http';
import { from } from "apollo-link";

import { cache, IAppState, initialState } from './appState';
import { mutationResolvers } from './mutations';
import { cleanTypenameLink } from "./links/cleanTypename";

export const client = new ApolloClient({
  link: from([cleanTypenameLink, createHttpLink({ uri: `http://localhost:${process.env.APP_PORT}/graphql` })]),
  cache,
  resolvers: {
    Query: {},
    Mutation: mutationResolvers
  }
});

client.onResetStore(async () => {
  client.writeData<IAppState>({
    data: initialState
  });
});