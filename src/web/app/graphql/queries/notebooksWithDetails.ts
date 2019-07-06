import gql from "graphql-tag";

export const notebooksWithDetailsQuery = gql`
  query NotebooksWithDetails($sort: Int = 1) {
    notebooks(sort: $sort) {
      _id,
      name,
      pageCount
    }
  }
`;

export type NotebooksWithDetailsArgs = { sort?: 1 | -1 };

export type NotebooksWithDetailsResp = {
  notebooks: Array<{ _id: string, name: string, pageCount: number }>;
};