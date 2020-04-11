import * as mongoose from 'mongoose';
import { ROLES } from 'src/assets/constants';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, deault: ROLES.TEACHER },
});