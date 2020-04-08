import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { HeroService } from './hero.service';
import { Hero } from './hero.model';
import { HeroInput } from './hero.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/assets/decorators';
import { ROLES } from 'src/assets/constants';

@Resolver('Hero')
export class HeroResolver {
  constructor(private readonly heroService: HeroService) {}

  @Query(() => [Hero])
  async getAllHeroes() {
    return this.heroService.findAll();
  }

  @Query(() => [Hero])
  async getTopHeroes() {
    return this.heroService.findTopHeroes();
  }

  @Query(() => Hero)
  async getOneHeroById(@Args('id') id: string) {
    return this.heroService.findOneById(id);
  }

  @Query(() => [Hero])
  async getHeroesBySomeStringInName(@Args('someStringInName') someStringInName: string) {
    return this.heroService.searchBySomeStringInName(someStringInName);
  }
  
  @Mutation(() => Hero)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addHero(@Args('heroInput') heroInput: HeroInput) {
    return this.heroService.create(heroInput);
  }

  @Mutation(() => Hero)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateHero(@Args('heroInput') heroInput: HeroInput) {
    return this.heroService.update(heroInput);
  }

  @Mutation(() => Hero)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteHeroById(@Args('id') id: string) {
    return this.heroService.deleteOneById(id);
  }
}
