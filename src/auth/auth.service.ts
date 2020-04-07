import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserInput } from 'src/user/user.input';
import { AuthToken } from './auth-token.model';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private readonly jwtService: JwtService) { }

  async validateUser(userInput: UserInput): Promise<AuthToken> {
    const findedUser = await this.userService.findOneByName(userInput.username);
    // bcryptjs将从数据库中得到密码的hash值中先取出盐值，然后与明文密码hash后进行比较
    if (findedUser && await bcryptjs.compare(userInput.password, findedUser.password)) {
      const payload = { username: findedUser.username, id: findedUser.id, role: findedUser.role};
      return { id: findedUser.id, token: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException();
    }
  }

  async logout(): Promise<string> {
    // 通知Angular停用token即可？？？
    return 'ok';
  }
}
