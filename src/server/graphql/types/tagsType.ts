import { ObjectType, Field } from "type-graphql";
import { PageType } from "./pageType";

// tslint:disable max-classes-per-file

@ObjectType()
export class TagsType {
  @Field()
  public tag: string;

  @Field(type => [PageType])
  public pages: PageType[];
}