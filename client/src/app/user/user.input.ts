import { ROLES } from '../shared/constants';

export interface UserInput {
  id?: string;
  username: string;
  password: string;
  role?: ROLES;
}