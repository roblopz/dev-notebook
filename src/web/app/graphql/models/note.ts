import { mongoID } from "./shared";

export interface ISnippet {
  language?: string;
  code?: string;
}

export interface INote {
  header: string;
  subheader?: string;
  content?: string;
  snippet?: ISnippet;
  hideContent?: boolean;
  hideSnippet?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}