import { ObjectType, Field, ID } from "type-graphql";

// tslint:disable max-classes-per-file

@ObjectType()
export class Snippet {
  @Field(type => ID, { nullable: true })
  public _id?: string;

  @Field()
  public language: string;

  @Field()
  public code: string;

  @Field({ defaultValue: new Date() })
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}

@ObjectType()
export class Note {
  @Field(type => ID)
  public _id: string;

  @Field()
  public header: string;

  @Field({ nullable: true })
  public subheader?: string;

  @Field({ nullable: true })
  public content?: string;

  @Field(type => Snippet, { nullable: true })
  public snippet?: Snippet;

  @Field({ nullable: true, defaultValue: false })
  public hideContent?: boolean;

  @Field({ nullable: true, defaultValue: false })
  public hideSnippet?: boolean;

  @Field({ defaultValue: new Date() })
  public createdAt: Date;

  @Field({ nullable: true })
  public updatedAt?: Date;
}