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
  @Field({ nullable: true })
  public _id?: string;

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
  public createdAt?: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}

@InputType()
export class CreateOrUpdatePageInput {
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