import { Field, InputType, registerEnumType } from "type-graphql";
import { OffsetPaginationInput, SortOrder } from "./common";

// tslint:disable max-classes-per-file

export enum SortPagesBy { PageUpdatedAt, PageCreatedAt }
registerEnumType(SortPagesBy, { name: 'SortPagesBy' });

@InputType()
export class PageSearch {
  @Field({ nullable: true })
  public search?: string;

  @Field({ nullable: true })
  public title?: boolean;
}

@InputType()
export class NoteSearch {
  @Field({ nullable: true })
  public search?: string;
  
  @Field({ nullable: true })
  public code?: boolean;

  @Field({ nullable: true })
  public content?: boolean;

  @Field({ nullable: true })
  public header?: boolean;

  @Field({ nullable: true })
  public subheader?: boolean;
}

@InputType()
export class PagesInput extends OffsetPaginationInput {
  @Field(type => PageSearch, { nullable: true })
  public pageSearch?: PageSearch;

  @Field(type => NoteSearch, { nullable: true })
  public noteSearch?: NoteSearch;

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