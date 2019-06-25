import { ObjectType, Field, ID } from "type-graphql";
import { PageType } from './pageType';

@ObjectType()
export class NotebookType {
  @Field(type => ID)
  public _id: string;

  @Field()
  public name: string;

  @Field(type => [PageType], { nullable: true })
  public pages?: PageType[];

  @Field()
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}