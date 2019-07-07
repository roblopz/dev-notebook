import { ObjectType, Field } from "type-graphql";
import { PageType } from "./pageType";

@ObjectType()
export class PagesResult {
  @Field(type => [PageType])
  public pages: PageType[];

  @Field(type => Boolean)
  public hasMore: boolean;

  @Field()
  public current: number;
}