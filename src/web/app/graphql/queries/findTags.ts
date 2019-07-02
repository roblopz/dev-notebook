import gql from "graphql-tag";

export const findTagsQuery = gql`
  query FindTags($options: FindTagsInput) {
    tags: findTags(options: $options) {
      tag
    }
  }
`;

export type FindTagsInput = {
  options: {
    search?: string;
    sortBy?: 'PageUpdatedAt' | 'PageCreatedAt';
    sortOrder?: 'Ascending' | 'Descending';
    pageSize?: number;
    current?: number;
  }
};

export type FindTagsResp = {
  tags: Array<{ tag: string }>
};