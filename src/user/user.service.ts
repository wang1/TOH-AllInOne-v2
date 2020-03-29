import { Injectable } from '@nestjs/common';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserInput } from './dto/user.input';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UserService {

  constructor(@InjectModel('UserModel') private userModel: Model<User>) { }

  async create(userInput: UserInput): Promise<User> {
    // 10是默认的盐值，将与密码一起被hash，有固定长度16b及位置
    const password = await bcryptjs.hash(userInput.password, 10);
    return await this.userModel({...userInput, password}).save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(username: string): Promise<User> {
    return await this.userModel.findOne({username: username});
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async deleteById(id: string): Promise<boolean> {
    return await this.userModel.findByIdAndRemove(id);
  }
}
