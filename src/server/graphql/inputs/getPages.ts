import { Field, InputType, registerEnumType } from "type-graphql";
import { OffsetPaginationInput, SortOrder } from "./common";

export enum SortPagesBy { PageUpdatedAt, PageCreatedAt }
registerEnumType(SortPagesBy, { name: 'SortPagesBy' });

@InputType()
export class PagesInput extends OffsetPaginationInput {
  @Field({ nullable: true })
  public search?: string;

  @Field({ nullable: true })
  public notebook?: string;

  @Field(type => [String], { nullable: true })
  public tags?: string[];

  @Field({ nullable: true })
  public language?: string;
  
  @Field(type => SortPagesBy, { nullable: true, defaultValue: SortPagesBy.PageUpdatedAt })
  public sortBy?: SortPagesBy = SortPagesBy.PageUpdatedAt;

  @Field(type => SortOrder, { nullable: true, defaultValue: SortOrder.Descending })
  public sortOrder?: SortOrder = SortOrder.Descending;
}