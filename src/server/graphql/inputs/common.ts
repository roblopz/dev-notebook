import { Field, Int, ID, ArgsType, registerEnumType, InputType } from "type-graphql";
import { Min, IsOptional, IsString, IsIn, IsInt } from "class-validator";

// tslint:disable max-classes-per-file

export enum SortOrder { Ascending, Descending }
registerEnumType(SortOrder, { name: 'SortOrder' });

@InputType()
export abstract class CursorPaginationInput {
  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  public take?: number;

  @Field(type => ID, { nullable: true })
  @IsOptional()
  @IsString()
  public after?: string;
}

@InputType()
export abstract class OffsetPaginationInput {
  @Field(type => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  public pageSize?: number;

  @Field(type => Int, { nullable: true, defaultValue: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  public current?: number = 1;

  public get skip() {
    return this.pageSize * (this.current - 1);
  }

  public get take() {
    return this.pageSize || Number.MAX_SAFE_INTEGER;
  }
}
