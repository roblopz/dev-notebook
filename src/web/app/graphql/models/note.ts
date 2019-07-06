
export interface ISnippet {
  language?: string;
  code?: string;
  htmlCode?: string;
}

export interface INote {
  _id?: string;
  header: string;
  subheader?: string;
  content?: string;
  plainTextContent?: string;
  htmlContent?: string;
  snippet?: ISnippet;
  createdAt?: Date;
  updatedAt?: Date;
}