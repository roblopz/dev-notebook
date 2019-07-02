import gql from "graphql-tag";
import { IAppState } from "../appState";

export const showingPagesCountQuery = gql`
  {
    showingPagesCount @client
  }
`;

export type ShowingPagesCountResp = Pick<IAppState, 'showingPagesCount'>;