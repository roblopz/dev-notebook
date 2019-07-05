import gql from "graphql-tag";
import { IResolver } from "../definitions";
import { IAppState } from "../appState";

export const setPagesCountMutation = gql`
  mutation SetPagesCount($count: Int!) {
    setPagesCount(count: $count) @client
  }
`;

export type SetPagesCountInput = { count: number };
export type SetPagesCountResp = void;

export const setPagesCountResolver: { setPagesCount: IResolver<SetPagesCountInput> } = {
  setPagesCount: (_root, { count }, { cache }) => {
    cache.writeData<Partial<IAppState>>({ data: { pagesCount: count } });
  }
};