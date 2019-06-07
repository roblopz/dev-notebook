import { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import ApolloClient, { Resolvers } from 'apollo-client';

const _addedResolvers: Array<Resolvers | Resolvers[]> = [];

export function useResolver<T = object>(resolvers: Resolvers | Resolvers[], overrideResolver = false, overrideClient?: ApolloClient<T>) {
  const client = useApolloClient<T>(overrideClient);

  useEffect(() => {
    const existing = _addedResolvers.includes(resolvers);
    if (!existing)
      _addedResolvers.push(resolvers);

    if (!existing || overrideResolver)
      client.addResolvers(resolvers);
  }, []);

  return client;
}