import { InMemoryCache } from 'apollo-cache-inmemory';
const cache = new InMemoryCache();

export type PageFilters = {
  __typename?: 'PageFilters';
  pageSearch: {
    __typename?: 'PageFilters_PageSearch'
    search?: string;
    title?: boolean;
  };
  noteSearch: {
    __typename?: 'PageFilters_NoteSearch'
    search?: string;
    code?: boolean;
    content?: boolean;
    header?: boolean;
    subheader?: boolean;
  }
  notebook?: string;
  tags?: string[];
  language?: string;
  sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
  sortOrder?: 'Ascending' | 'Descending';
  pageSize?: number;
  current?: number;
};

export interface IAppState {
  pageFilters: PageFilters;
  pagesCount: number;
}

export const initialState: IAppState = {
  pageFilters: {
    __typename: 'PageFilters',
    pageSearch: {
      __typename: 'PageFilters_PageSearch',
      search: null,
      title: true
    },
    noteSearch: {
      __typename: 'PageFilters_NoteSearch',
      search: null,
      code: true,
      content: true,
      header: true,
      subheader: true
    },
    language: null,
    notebook: null,
    tags: null,
    current: 1,
    pageSize: 10,
    sortBy: 'PageUpdatedAt',
    sortOrder: 'Descending'
  },
  pagesCount: 0
};

cache.writeData({ data: initialState });

export { cache };