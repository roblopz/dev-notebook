import { InMemoryCache } from 'apollo-cache-inmemory';
import { ID } from '../../models';
const cache = new InMemoryCache();

export interface IPageFilters {
  __typename: 'PageFilters';
  languages: string[];
  notebook: ID;
  search: string;
  tags: string[];
}

export interface IAppState {
  pageFilters: IPageFilters;
}

export const initialState: IAppState = {
  pageFilters: {
    __typename: 'PageFilters',
    languages: [],
    notebook: null,
    search: null,
    tags: []
  }
};

cache.writeData({
  data: initialState
});

export { cache };