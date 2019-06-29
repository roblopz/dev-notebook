import gql from 'graphql-tag';

export type FindTagsInput = {
  search?: string;
  sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
  sortOrder?: 'Ascending' | 'Descending';
  pageSize?: number;
  current?: number;
};

export type FindTagsResult = {
  tags: Array<{ tag: string }>
};

export const queries = {
  FING_TAGS: gql`
    query FindTags($options: FindTagsInput) {
      tags: findTags(options: $options) {
        tag
      }
    }
  `
};