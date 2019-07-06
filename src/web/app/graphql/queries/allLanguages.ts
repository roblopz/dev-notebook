import gql from "graphql-tag";

export const getAllLanguages = gql`
  query GetAllLanguages {
    languages: allLanguages
  }
`;

export type GetAllLanguagesResp = {
  languages: string[]
};