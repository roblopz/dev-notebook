import { Field, InputType } from "type-graphql";
import { IsOptional, IsArray, ArrayMinSize, ValidateNested } from "class-validator";

// tslint:disable max-classes-per-file

@InputType()
export class NewNoteSnippetInput {
  @Field({ nullable: true })
  public language: string;

  @Field({ nullable: true })
  public code: string;

  @Field({ nullable: true })
  public htmlCode?: string;
}

@InputType()
export class NewPageNoteInput {
  @Field()
  public header: string;

  @Field({ nullable: true })
  public subheader?: string;

  @Field({ nullable: true })
  public content?: string;

  @Field({ nullable: true })
  public plainTextContent?: string;

  @Field({ nullable: true })
  public htmlContent?: string;

  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  public snippet?: NewNoteSnippetInput;

  @Field({ nullable: true })
  public hideContent?: boolean;

  @Field({ nullable: true })
  public hideSnippet?: boolean;
}

@InputType()
export class CreatePageInput {
  @Field()
  public title: string;

  @Field()
  public notebook: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  public tags?: string[];

  @Field(type => [NewPageNoteInput], { nullable: false })
  @IsArray()
  @ArrayMinSize(1)
  public notes: NewPageNoteInput[];
}