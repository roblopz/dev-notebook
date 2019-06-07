import { Field, Int, ID, InputType } from "type-graphql";
import { Min, Max, IsOptional, IsString } from "class-validator";

@InputType()
export class PaginateInput {
  @Field(type => Int, { defaultValue: 5 })
  @IsOptional()
  @Min(1)
  @Max(50)
  public take: number;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsString()
  public after?: string;
}
