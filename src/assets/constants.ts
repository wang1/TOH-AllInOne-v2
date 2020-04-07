import { registerEnumType } from '@nestjs/graphql'

export const Constants = {
  MONGODB_URL: 'mongodb://localhost/authTest',
  SCHEMA_FILENAME: 'schema.gql',
  JWT_SECRET: 'haha',
  USER_MODEL: 'UserModel',
  HERO_MODEL: 'HeroModel',
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