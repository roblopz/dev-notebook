import { IPage } from "./page";

export interface INotebook {
  _id?: string;
  name?: string;
  pages?: IPage[];
  createdAt?: Date;
  updatedAt?: Date;
}