import gql from "graphql-tag";

export const pageFragment = gql`
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
      plainTextContent
      htmlContent
      snippet {
        code
        language
        htmlCode
      }
      createdAt
      updatedAt
    }
  }
`;