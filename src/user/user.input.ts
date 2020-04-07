import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class UserInput {
  id?: string;
  username: string;
  @MinLength(4)
  password: string;
  role: string;
}