import gql from "graphql-tag";

export const notebooksQuery = gql`
  query Notebooks($sort: Int = 1) {
    notebooks(sort: $sort) {
      _id,
      name
    }
  }
`;

export type NotebooksArgs = { sort?: 1 | -1 };

export type NotebooksResp = {
  notebooks: Array<{ _id: string, name: string }>;
};