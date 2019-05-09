export type mongoID = string;
export type fieldErrors = string[];

export interface INotebook {
  _id: mongoID;
  name: string;
  pages: IPage[] | mongoID[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPage {
  _id: mongoID;
  title: string;
  notebook: INotebook | mongoID;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface INote {
  _id: mongoID;
  header: string;
  subheader: string;
  content: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ValidationError = {
  [field: string]: fieldErrors;
};

export interface IStateData<T> {
  value: T;
  loading: boolean;
  rawError: Error;
  validationErrors: ValidationError[];
}

export interface IAppState {
  notebooks: IStateData<INotebook[]>;
  pages: IStateData<IPage[]>;
  currentPage: IStateData<IPage>;
}