import { mongoID } from "./shared";
import { INotebook } from "./notebook";
import { INote } from "./note";

export interface IPage {
  _id: mongoID;
  title: string;
  notebook: INotebook;
  tags: string[];
  notes: INote[];
  createdAt?: Date;
  updatedAt?: Date;
}