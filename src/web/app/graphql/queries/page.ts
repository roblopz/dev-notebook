import gql from "graphql-tag";
import { pageFragment } from '../fragments/page';
import { PageType } from "./pages";

export const pageQuery = gql`
  query Page($id: String!) {
    page(id: $id) {
      ...fullPage
    }
  }
  ${pageFragment}
`;

export type PageArgs = { id: string };

export type PageResp = {
  page: PageType;
};