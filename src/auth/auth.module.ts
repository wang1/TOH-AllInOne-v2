import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { Constants } from 'src/assets/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

// The token is still valid and can be used.
//  What if I need to ensure that the token cannot be used ever again?
// This is why keeping JWT expiry values to a small value is important.
// And this is why ensuring that your JWTs don't get stolen is even more important. 
// The token is valid (even after you delete it on the client), 
// but only for short period to reduce the probability of it being used maliciously.

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: Constants.JWT_SECRET,
      // 保证短期的token有助于安全。但我们的token放在客户端app中，不存在泄漏的问题，
      // 客户logout或关闭或刷新页面token即消失，
      // 所以加长
      signOptions: { expiresIn: 3600 * 3 }, 
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],

})
export class AuthModule { }
