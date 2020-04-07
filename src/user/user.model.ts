import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ROLES } from 'src/assets/constants';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;
  username: string;
  password: string;
  role: ROLES;
}