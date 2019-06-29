import gql from 'graphql-tag';

import { PageResult, fragments as pageFragments } from './pageQueries';

export const fragments = {
  fullNotebook: gql`
    fragment fullNotebook on NotebookType {
      _id
      name
      createdAt
      updatedAt
      pages {
        ...fullPage
      }
    }
    ${pageFragments.fullPage}
  `
};

export type NotebookResult = {
  _id: string;
  name: string;
  pages: PageResult[],
  createdAt: Date;
  updatedAt?: Date;
};

export type NotebookByNameResult = {
  _id: string;
  name: string;
};

export type GetNotebooksResult = { notebooks: NotebookResult[] };
export type GetNotebooksByNameResult = { notebooks: NotebookByNameResult[] };
export type GetNotebooksByNameArgs = {
  name?: string;
  sort?: -1 | 1
};

export const queries = {
  GET_NOTEBOOKS: gql`
    {
      notebooks {
        ...fullNotebook
      }
    }
    ${fragments.fullNotebook}
  `,
  
  GET_NOTEBOOKS_BY_NAME: gql`
    query GetNotebooksByName($name: String, $sort: Int) {
      notebooks(name: $name, sort: $sort) {
        _id
        name
      }
    }
  `
};
