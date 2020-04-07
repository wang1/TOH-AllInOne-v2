import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsNumber, IsBoolean, Min, ValidateIf } from 'class-validator';

@InputType()
export class HeroInput {
  @ValidateIf(o => o.id)  // 条件验证， 如果没有id属性则放弃
  @IsString()
  id?: string;
  
  @IsString()
  no: string;
  
  @IsString()
  name: string;
  
  @ValidateIf(o => o.salary)
  @IsNumber()
  @Field(type => Float)
  @Min(0)
  salary?: number;
  
  @ValidateIf(o => o.description)
  @IsString()
  description?: string;
  
  @ValidateIf(o =>o.isTop)
  @IsBoolean()
  isTop?: boolean;
}