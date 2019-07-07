import gql from "graphql-tag";
import { PageFilters } from "../appState";

export const pageFiltersQuery = gql`
  {
    pageFilters @client {
      language
      notebook
      pageSearch {
        search
        title
      }
      noteSearch {
        search
        code
        content
        header
        subheader
      }
      tags
      pageSize
      sortBy
      sortOrder
    }
  }
`;

export type PageFiltersResp = {
  pageFilters: PageFilters
};