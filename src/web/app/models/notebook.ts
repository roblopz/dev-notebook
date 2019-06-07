import { mongoID } from "./shared";
import { IPage } from "./page";

export interface INotebook {
  _id: mongoID;
  name: string;
  pages: IPage[];
  createdAt?: Date;
  updatedAt?: Date;
}