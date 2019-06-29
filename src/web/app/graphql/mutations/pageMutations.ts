import gql from "graphql-tag";
import { fragments, PageResult } from "../queries/pageQueries";

export type CreatePageInput = {
  input: {
    title: string;
    notebook: string;
    tags?: string[];
    notes: Array<{
      header: string;
      subheader?: string;
      content?: string;
      snippet?: {
        language: string;
        code: string;
      };
      hideContent?: boolean;
      hideSnippet?: boolean;
    }>
  }
};

export type CreatePageResult = {
  newPage: PageResult
};

export const mutations = {
  CREATE_PAGE: gql`
    mutation CreatePage($input: CreatePageInput!) {
      newPage: createPage(page: $input) {
        ...fullPage
      }
    }
    ${fragments.fullPage}
  `
};