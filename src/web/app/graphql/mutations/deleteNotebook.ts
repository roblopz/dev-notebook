import gql from "graphql-tag";

export const deleteNotebookMutation = gql`
  mutation DeleteNotebook($id: String!) {
    status: deleteNotebook(id: $id)
  }
`;

export type DeleteNotebookInput = {
  id: string;
};

export type DeleteNotebookResp = {
  status: string;
};