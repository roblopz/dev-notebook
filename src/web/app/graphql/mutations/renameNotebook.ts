import gql from "graphql-tag";

export const renameNotebookMutation = gql`
  mutation RenameNotebook($id: String!, $name: String!) {
    status: renameNotebook(id: $id, name: $name)
  }
`;

export type RenameNotebookInput = {
  id: string;
  name: string;
};

export type RenameNotebookResp = {
  status: string;
};