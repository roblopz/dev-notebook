import gql from "graphql-tag";
import _merge from 'lodash.merge';

import { IResolver } from "../definitions";
import { PageFilters, IAppState } from "../appState";
import { pageFiltersQuery, PageFiltersResp } from "../queries/pageFilters";

export const setPageFiltersMutation = gql`
  mutation SetPageFilters($pageFilters: SetPageFiltersInput!) {
    setPageFilters(pageFilters: $pageFilters) @client
  }
`;

export type SetPageFiltersInput = {
  pageFilters: PageFilters
};

export type SetPageFiltersResp = void;

export const setPageFiltersResolver: { setPageFilters: IResolver<SetPageFiltersInput> } = {
  setPageFilters: (_root, { pageFilters }, { cache }) => {
    const { pageFilters: currentFilters } = cache.readQuery<PageFiltersResp>({ query: pageFiltersQuery });
    const newFilters = _merge(currentFilters, pageFilters);
    cache.writeData<Partial<IAppState>>({ data: { pageFilters: newFilters } });
  }
};