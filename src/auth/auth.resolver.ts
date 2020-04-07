import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthToken } from './auth-token.model';
import { UserInput } from 'src/user/user.input';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Query(() => AuthToken)
  // @UseGuards(LocalAuthGuard)
  async login(@Args('loginUser') userInput: UserInput) {
    return this.authService.validateUser(userInput);
  }

  @Query(() => String)
  async logout() {
    return this.authService.logout();
  }
}
