import gql from "graphql-tag";
import { pageFragment } from '../fragments/page';
import { Merge } from "../../../../shared/tsUtil";
import { IPage, INote } from "../models";

export const createOrUpdatePageMutation = gql`
  mutation CreateOrUpdatePage($id: String, $input: CreateOrUpdatePageInput!) {
    newPage: createOrUpdatePage(id: $id, page: $input) {
      ...fullPage
    }
  }
  ${pageFragment}
`;

export type CreateOrUpdatePagePage = {
  _id?: string;
  title: string;
  notebook: string;
  tags?: string[];
  notes: Array<{
    header: string;
    subheader?: string;
    content?: string;
    plainTextContent?: string;
    htmlContent?: string;
    snippet?: {
      language?: string;
      code?: string;
      htmlCode?: string;
    };
  }>
};

export type CreateOrUpdatePageInput = {
  id?: string;
  input: CreateOrUpdatePagePage
};

export type CreateOrUpdatePageResp = {
  newPage: Merge<IPage, { notes: INote[] }>;
};