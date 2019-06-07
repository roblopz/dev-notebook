import gql from 'graphql-tag';
import { nameof } from '../../lib/tsUtil';
import { IAppMutation } from './definitions';
import { IAppState, IPageFilters } from './appState';

export interface ISetPageFiltersMutationInput {
  pageFilters: {
    search?: string;
    notebook?: string;
    language?: string;
    tags?: string[];
  };
}

export const mutations = {
  setPageFilters: {
    get __resolverName() {
      return 'SetPageFilters';
    },
    get __inputName() {
      return nameof<ISetPageFiltersMutationInput>('pageFilters');
    },
    get query() {
      return gql(`
        mutation ${this.__resolverName}($${this.__inputName}: Input!) {
          ${this.__resolverName}(${this.__inputName}: $${this.__inputName}) @client
        }
      `);
    },
    resolver(_root, { pageFilters: newFilters }, { cache }) {
      const GET_ALL_PAGE_FILTERS = gql`
        {
          currentFilters: pageFilters {
            search,
            notebook,
            language,
            tags
          }
        }
      `;

      const { currentFilters } = cache.readQuery<{
        currentFilters: IPageFilters
      }>({ query: GET_ALL_PAGE_FILTERS });

      const newData: Pick<IAppState, 'pageFilters'> = {
        pageFilters: { ...currentFilters, ...newFilters }
      };

      cache.writeData({
        data: newData
      });
    }
  } as IAppMutation<ISetPageFiltersMutationInput>
};

export const MutationDefs = {
  [mutations.setPageFilters.__resolverName]: mutations.setPageFilters.resolver
};