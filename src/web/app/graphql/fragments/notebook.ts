import gql from "graphql-tag";
import { pageFragment } from "./page";

export const notebookFragment = gql`
  fragment fullNotebook on NotebookType {
    _id
    name
    createdAt
    updatedAt
    pages {
      ...fullPage
    }
  }
  ${pageFragment}
`;