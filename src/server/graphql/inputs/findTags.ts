import { Field, InputType, registerEnumType } from "type-graphql";
import { OffsetPaginationInput, SortOrder } from "./common";

export enum SortTagsBy { PageUpdatedAt, PageCreatedAt }
registerEnumType(SortTagsBy, { name: 'SortTagsBy' });

@InputType()
export class FindTagsInput extends OffsetPaginationInput {
  @Field({ nullable: true })
  public search?: string;
  
  @Field(type => SortTagsBy, { nullable: true, defaultValue: SortTagsBy.PageUpdatedAt })
  public sortBy?: SortTagsBy = SortTagsBy.PageUpdatedAt;

  @Field(type => SortOrder, { nullable: true, defaultValue: SortOrder.Descending })
  public sortOrder?: SortOrder = SortOrder.Descending;
}