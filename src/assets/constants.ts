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
  PUBLIC = 'public',
};

registerEnumType(
  ROLES,{
    name: 'ROLES',
  },
);