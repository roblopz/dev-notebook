import { ObjectType, Field, ID } from "type-graphql";
import { NoteType } from "./noteType";

// tslint:disable max-classes-per-file

@ObjectType()
export class PageNotebookType {
  @Field(type => ID)
  public _id: string;

  @Field()
  public name: string;
}

@ObjectType()
export class PageType {
  @Field(type => ID)
  public _id: string;

  @Field()
  public title: string;

  @Field(type => PageNotebookType)
  public notebook: PageNotebookType | string;

  @Field(type => [String], { nullable: true })
  public tags?: string[];

  @Field(type => [NoteType])
  public notes: NoteType[];

  @Field()
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}