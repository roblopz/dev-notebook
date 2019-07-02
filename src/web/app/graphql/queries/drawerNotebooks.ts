import gql from "graphql-tag";

export const drawerNotebooksQuery = gql`
  query DrawerNotebooks($sort: Int = 1) {
    notebooks(sort: $sort) {
      _id,
      name
    }
  }
`;

export type DrawerNotebooksArgs = { sort?: 1 | -1 };

export type DrawerNotebooksResp = {
  notebooks: Array<{ _id: string, name: string }>;
};