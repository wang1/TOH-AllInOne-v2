import { Injectable, ExecutionContext, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from 'src/assets/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Jwt策略的初始化
    // 从请求的验证验证头部获取bearer token
    // 过期的令牌（PassportModule中配置了3600s）不予支持
    // 解密的密钥（与签署时相同）
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  // 重写validate方法。对于jwt策略，Passport首先校验签名即令牌，然后解码为JSON格式的payload，然后再调用此方法
  // 因此，在执行此方法时，我们已经得到Passport的有效验证保证 
  // 该方法将从令牌中获取的信息包装为一个user对象，附加在Request对象上供使用。也即，当前Request对象就多了一个user对象。
  // This is also the place we may decide to do further token validation, such as looking up the userId in a list of revoked tokens, enabling us to perform token revocation. 
  async validate(payload: any): Promise<any> { 
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}