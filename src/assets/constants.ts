import { registerEnumType } from '@nestjs/graphql'

export const jwtConstants = {
  secret: 'haha',
};

export enum ROLES {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
};

registerEnumType(
  ROLES,{
    name: 'ROLES',
  },
);