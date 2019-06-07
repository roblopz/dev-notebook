import ApolloClient from "apollo-boost";
import { MutationDefs } from "./@client/mutations";
import { QueryDefs } from './@client/queries';
import { cache } from './@client/appState';
export var client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: cache,
    resolvers: {
        Query: QueryDefs,
        Mutation: MutationDefs
    }
});
//# sourceMappingURL=index.js.map