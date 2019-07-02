import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http';

import { cache, IAppState, initialState } from './appState';

// @client mutation imports
import { setPageFiltersResolver } from './mutations/setPageFilters';

export const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache,
  resolvers: {
    Query: {},
    Mutation: {
      ...setPageFiltersResolver
    }
  }
});

client.onResetStore(async () => {
  client.writeData<IAppState>({
    data: initialState
  });
});