
export type ID = string;

export interface IEntity {
  _id?: ID;
  createdAt: Date;
  updatedAt?: Date;
}

export interface INote extends IEntity {
  header: string;
  subheader?: string;
  content?: string;
  plainTextContent?: string;
  htmlContent?: string;
  snippet?: INoteSnippet;
}

export interface INoteSnippet {
  language?: string;
  code?: string;
  htmlCode?: string;
}

export interface INotebook extends IEntity {
  name: string;
}

export interface IPage extends IEntity {
  title: string;
  notebook: ID;
  tags?: string[];
  notes: INote[];
}