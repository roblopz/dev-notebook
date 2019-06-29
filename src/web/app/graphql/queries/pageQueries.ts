import gql from 'graphql-tag';

export const fragments = {
  fullPage: gql`
    fragment fullPage on PageType {
      _id
      title
      tags
      createdAt
      updatedAt
      notebook {
        _id
        name
      }
      notes {
        header
        subheader
        content
        snippet {
          code
          language
        }
        createdAt
        updatedAt
      }
    }
  `
};

export type PageNoteResult = {
  header: string;
  subheader?: string;
  content?: string;
  snippet?: {
    code?: string;
    language?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
};

export type PageResult = {
  _id: string;
  title: string;
  tags?: string[];
  createAt: Date;
  updatedAt?: Date;
  notebook: {
    _id: string;
    name: string;
  };
  notes: PageNoteResult[]
};

export type GetPagesResult = { pages: PageResult[] };

export const queries = {
  GET_PAGES: gql`
    {
      pages {
        ...fullPage
      }
    }
    ${fragments.fullPage}
  `
};