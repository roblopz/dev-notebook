import { Field, ID, InputType } from "type-graphql";
import { IsOptional, Length, IsString, IsArray } from "class-validator";

@InputType()
export class PageFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @Length(3)
  public search?: string;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsString()
  public notebook?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  public language?: string;

  @Field(type => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  public tags?: string;
}