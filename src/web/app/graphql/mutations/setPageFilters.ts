import gql from "graphql-tag";
import { IResolver } from "../definitions";
import { PageFilters, IAppState } from "../appState";

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
    cache.writeData<Partial<IAppState>>({ data: { pageFilters } });
  }
};