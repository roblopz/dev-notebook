import gql from 'graphql-tag';
import { IPage } from '../../models';

export const fragments = {
  fullPage: gql`
    fragment FullPage on Page {
      _id,
      title,
      tags,
      notebook {
        _id,
        name,
        createdAt,
        updatedAt
      }
      notes {
        _id,
        header,
        subheader,
        content,
        snippet {
          code,
          language
        },
        createdAt,
        updatedAt
      }
      createdAt,
      updatedAt
    }
  `
};

export interface IGetPageResultsData {
  pages: IPage[];
}

export interface IGetAllPageTagsData {
  tags: string[];
}

export const queries = {
  GET_PAGE_RESULTS: gql`
    {
      pages {
        ...FullPage
      }
    }
    ${fragments.fullPage}
  `,

  GET_ALL_PAGE_TAGS: gql`
  {
    tags: allPageTags
  }
  `
};