import { ObjectType, Field } from "type-graphql";

// tslint:disable max-classes-per-file

@ObjectType()
export class NoteSnippetType {
  @Field({ nullable: true })
  public language?: string;

  @Field({ nullable: true })
  public code?: string;

  @Field({ nullable: true })
  public htmlCode?: string;
}

@ObjectType()
export class NoteType {
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

  @Field(type => NoteSnippetType, { nullable: true })
  public snippet?: NoteSnippetType;

  @Field()
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}