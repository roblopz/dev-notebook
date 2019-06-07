import { InMemoryCache } from 'apollo-cache-inmemory';
var cache = new InMemoryCache();
export var initialState = {
    pageFilters: {
        __typename: 'PageFilters',
        language: null,
        notebook: null,
        search: null,
        tags: null
    }
};
cache.writeData({
    data: initialState
});
export { cache };
//# sourceMappingURL=appState.js.map