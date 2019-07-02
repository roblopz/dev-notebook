import gql from "graphql-tag";
import { pageFragment } from '../fragments/page';
import { Merge } from "../../../../shared/tsUtil";
import { IPage, INote } from "../models";

export const createPageMutation = gql`
  mutation CreatePage($input: CreatePageInput!) {
    newPage: createPage(page: $input) {
      ...fullPage
    }
  }
  ${pageFragment}
`;

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
        language?: string;
        code?: string;
      };
      hideContent?: boolean;
      hideSnippet?: boolean;
    }>
  }
};

export type CreatePageResp = {
  newPage: Merge<IPage, { notes: INote[] }>;
};