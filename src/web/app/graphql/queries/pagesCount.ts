import gql from "graphql-tag";
import { IAppState } from "../appState";

export const pagesCountQuery = gql`
  {
    pagesCount @client
  }
`;

export type PagesCountResp = Pick<IAppState, 'pagesCount'>;