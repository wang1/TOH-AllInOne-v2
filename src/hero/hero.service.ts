import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/assets/constants';
import { Hero } from './hero.model';
import { Model } from 'mongoose';
import { HeroInput } from './hero.input';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Constants.HERO_MODEL) private heroModel: Model<Hero>) {}

  async create(heroInput: HeroInput): Promise<Hero> {
    return await this.heroModel(heroInput).save();
  }

  async findAll(): Promise<Hero[]> {
    return await this.heroModel.find();
  }

  async findOneById(id: string): Promise<Hero> {
    return await this.heroModel.findById(id);
  }

  async findTopHeroes(): Promise<Hero> {
    return await this.heroModel.find({ isTop: true});
  }

  async searchBySomeStringInName(someStringInName: string): Promise<Hero[]> {
    return await this.heroModel.find({ name: new RegExp(someStringInName) }, 'name'); // 仅返回name字段，id一直会有
  }

  async deleteOneById(id: string): Promise<Hero> {
    return await this.heroModel.findByIdAndRemove(id);
  }

  async update(heroInput: HeroInput): Promise<Hero> {
    return await this.heroModel.findByIdAndUpdate(heroInput.id, heroInput, {new: true});  // 返回更新后的对象，默认是原始对象
  }

}
