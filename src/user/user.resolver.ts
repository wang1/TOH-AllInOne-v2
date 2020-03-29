import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './model/user.model';
import { UserInput } from './dto/user.input';
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
    // JwtAuthGuard是
  @UseGuards(JwtAuthGuard, RolesGuard)  // JwtAuth
  async getAllUsers(@CurrentUser() loginedUser: User) {
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUserByName(@Args('username') username: string) {
    return this.userService.findOne(username);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async addUser(@Args('newUser') userInput: UserInput) {
    return this.userService.create(userInput);
  }  

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async deleteUserById(@Args('id') id: string) {
    return this.userService.deleteById(id);
  }
}
