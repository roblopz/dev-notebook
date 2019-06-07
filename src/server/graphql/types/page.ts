import { ObjectType, Field, ID } from "type-graphql";
import { Notebook } from "./notebook";
import { Note } from "./note";

@ObjectType()
export class Page {
  @Field(type => ID)
  public _id: string;

  @Field()
  public title: string;

  @Field(type => Notebook)
  public notebook: Notebook | string;

  @Field(type => [String])
  public tags: string[];

  @Field(type => [Note])
  public notes: Note[];

  @Field({ defaultValue: new Date() })
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}