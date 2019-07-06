import gql from "graphql-tag";

export const deletePageMutation = gql`
  mutation DeletePage($id: String!) {
    status: deletePage(id: $id)
  }
`;

export type DeletePageInput = {
  id: string;
};

export type DeletePageResp = {
  status: string;
};