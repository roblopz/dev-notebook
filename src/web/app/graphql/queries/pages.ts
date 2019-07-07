import gql from "graphql-tag";
import { pageFragment } from '../fragments/page';
import { Merge } from "../../../../shared/tsUtil";
import { IPage, INote } from "../models";

export const pagesQuery = gql`
  query Pages($options: PagesInput) {
    result: pages(options: $options) {
      pages {
        ...fullPage
      }
      hasMore
      current
    }
  }
  ${pageFragment}
`;

export type PagesInputOptions = {
  pageSearch?: {
    search?: string;
    title?: boolean;
  };
  noteSearch?: {
    search?: string;
    code?: boolean;
    content?: boolean;
    header?: boolean;
    subheader?: boolean;
  }
  notebook?: string;
  tags?: string[];
  language?: string;
  sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
  sortOrder?: 'Ascending' | 'Descending';
  pageSize?: number;
  current?: number;
};

export type PagesInput = {
  options: PagesInputOptions;
};

export type PageType = Merge<IPage, { notes: INote[] }>;

export type PagesResp = {
  result: {
    pages: PageType[];
    hasMore: boolean;
    current: number;
  }
};