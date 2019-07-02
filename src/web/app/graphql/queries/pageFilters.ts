import gql from "graphql-tag";
import { PageFilters } from "../appState";

export const pageFiltersQuery = gql`
  {
    pageFilters @client {
      language
      notebook
      search
      tags
      current
      pageSize
      sortBy
      sortOrder
    }
  }
`;

export type PageFiltersResp = {
  pageFilters: PageFilters
};