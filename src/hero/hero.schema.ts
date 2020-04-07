import * as mongoose from 'mongoose';

export const HeroSchema = new mongoose.Schema({
  no: { type: String, required: true},
  name: { type: String, required: true },
  salary: { type: Number, default: 0 },
  description: { type: String, default: '暂无介绍' },
  isTop: { type: Boolean, default: false },
});