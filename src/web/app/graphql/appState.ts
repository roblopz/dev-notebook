import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

export type PageFilters = {
  __typename: 'PageFilters';
  search?: string;
  notebook?: string | number;
  tags?: string[];
  language?: string;
  sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
  sortOrder?: 'Ascending' | 'Descending';
  pageSize?: number;
  current?: number;
};

export interface IAppState {
  pageFilters: PageFilters;
  showingPagesCount: number;
}

export const initialState: IAppState = {
  pageFilters: {
    __typename: 'PageFilters',
    search: null,
    language: null,
    notebook: null,
    tags: null,
    current: 1,
    pageSize: 10,
    sortBy: 'PageUpdatedAt',
    sortOrder: 'Descending'
  },
  showingPagesCount: 0
};

cache.writeData({ data: initialState });

export { cache };