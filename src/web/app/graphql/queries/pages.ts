import gql from "graphql-tag";
import { pageFragment } from '../fragments/page';
import { Merge } from "../../../../shared/tsUtil";
import { IPage, INote } from "../models";

export const pagesQuery = gql`
  query Pages($options: PagesInput) {
    pages(options: $options) {
      ...fullPage
    }
  }
  ${pageFragment}
`;

export type PagesInput = {
  options: {
    search?: string;
    notebook?: string;
    tags?: string[];
    language?: string;
    sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
    sortOrder?: 'Ascending' | 'Descending';
    pageSize?: number;
    current?: number;
  }
};

export type PagesResp = {
  pages: Array<Merge<IPage, { notes: INote[] }>>;
};