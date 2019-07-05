
export interface ISnippet {
  language?: string;
  code?: string;
  htmlCode?: string;
}

export interface INote {
  header: string;
  subheader?: string;
  content?: string;
  plainTextContent?: string;
  htmlContent?: string;
  snippet?: ISnippet;
  hideContent?: boolean;
  hideSnippet?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}