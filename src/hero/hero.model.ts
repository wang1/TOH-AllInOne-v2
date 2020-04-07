import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Hero {
  @Field(type => ID)
  id: string;
  no: string;
  name: string;
  @Field(type => Float)
  salary?: number;
  description?: string;
  isTop?: boolean;
}