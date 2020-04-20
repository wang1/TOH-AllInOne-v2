import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInput } from './user.input';
import * as bcryptjs from 'bcryptjs';
import { Constants } from 'src/assets/constants';

@Injectable()
export class UserService {

  constructor(@InjectModel(Constants.USER_MODEL) private userModel: Model<User>) { }

  async create(userInput: UserInput): Promise<User> {
    // 10是默认的盐值，将与密码一起被hash，有固定长度16b及位置
    const password = await bcryptjs.hash(userInput.password, 10);
    return await this.userModel({ ...userInput, password }).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }

  async findOneByName(username: string): Promise<User> {
    return await this.userModel.findOne({ username: username });
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async deleteOneById(id: string): Promise<boolean> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(userInput: UserInput): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userInput.id, userInput, { new: true });
  }
}
