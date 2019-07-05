import gql from "graphql-tag";
import { IAppState } from "../appState";

export const pagesCountQuery = gql`
  {
    showingPagesCount @client
  }
`;

export type PagesCountResp = Pick<IAppState, 'pagesCount'>;