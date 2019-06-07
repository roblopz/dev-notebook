import { ObjectType, Field, ID } from "type-graphql";
import { Page } from "./page";

@ObjectType()
export class Notebook {
  @Field(type => ID)
  public _id: string;

  @Field()
  public name: string;

  @Field(type => [Page])
  public pages: Array<string | Page>;

  @Field({ defaultValue: new Date() })
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}