import { InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { ROLES } from 'src/assets/constants';

@InputType()
export class UserInput {
  id?: string;
  username: string;
  @MinLength(4)
  password: string;
  role: string;
}