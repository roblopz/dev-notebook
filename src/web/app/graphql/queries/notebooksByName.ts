import gql from "graphql-tag";

export const notebooksByNameQuery = gql`
  query NotebooksByName($name: String, $sort: Int = 1) {
    notebooks(name: $name, sort: $sort) {
      _id
      name
    }
  }
`;

export type NotebooksByNameArgs = { name?: string, sort?: 1 | -1 };

export type NotebooksByNameResp = {
  notebooks: Array<{ _id: string, name: string }>;
};