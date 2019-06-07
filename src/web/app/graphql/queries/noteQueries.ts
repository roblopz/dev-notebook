import gql from 'graphql-tag';

export interface IGetAllNoteLanguagesData {
  languages: string[];
}

export const queries = {
  GET_ALL_NOTE_LANGUAGES: gql`
    {
      languages: allNoteLanguages
    }
  `
};