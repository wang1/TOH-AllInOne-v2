import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthToken {   // 返回的token对象，仅返回String不行，不得已构建了一个ObjectType对象
  @Field(type => ID)
  id: string;
  token: string;
}