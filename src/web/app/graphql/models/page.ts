import { INotebook } from "./notebook";
import { INote } from "./note";

export interface IPage {
  _id: string;
  title: string;
  notebook: INotebook;
  tags?: string[];
  notes: INote[];
  createdAt?: Date;
  updatedAt?: Date;
}