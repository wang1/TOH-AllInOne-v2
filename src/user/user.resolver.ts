import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserInput } from './user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser, Roles } from 'src/assets/decorators';
import { RolesGuard } from 'src/auth/roles.guard';
import { ROLES } from 'src/assets/constants';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Query(() => [User])
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAllUsers(@CurrentUser() loginedUser: User) {
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUserByName(@Args('username') username: string) {
    return this.userService.findOneByName(username);
  }

  @Mutation(() => User)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addUser(@Args('userInput') userInput: UserInput) {
    return this.userService.create(userInput);
  }  

  @Mutation(() => User)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteUserById(@Args('id') id: string) {
    return this.userService.deleteOneById(id);
  }

  @Mutation(() => User)
  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateUser(@Args('userInput') userInput: UserInput) {
    return this.userService.update(userInput);
  }
}
