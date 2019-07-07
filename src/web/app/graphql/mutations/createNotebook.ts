import gql from "graphql-tag";

export const createNotebookMutation = gql`
  mutation CreateNotebook($name: String!) {
    newNotebook: createNotebook(name: $name) {
      _id,
      name
    }
  }
`;

export type CreateNotebookInput = {
  name: string;
};

export type CreateNotebookResp = {
  newNotebook: { _id: string, name: string };
};