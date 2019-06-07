import { useEffect } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
var _addedResolvers = [];
export function useResolver(resolvers, overrideResolver, overrideClient) {
    if (overrideResolver === void 0) { overrideResolver = false; }
    var client = useApolloClient(overrideClient);
    useEffect(function () {
        var existing = _addedResolvers.includes(resolvers);
        if (!existing)
            _addedResolvers.push(resolvers);
        if (!existing || overrideResolver)
            client.addResolvers(resolvers);
    }, []);
    return client;
}
//# sourceMappingURL=graphqlHooks.js.map