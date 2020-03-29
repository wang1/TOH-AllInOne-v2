import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取resolver设置的Roles装饰，因为可能有多个角色都可以，所以注意其为数组
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles) {
      // 获取经过令牌认证后的user对象，其中含有该登录用户的role
      const userRole = GqlExecutionContext.create(context).getContext().req.user.role;
      const hasAnyRole = roles.find(role => role === userRole)
      if (hasAnyRole) { // resolver设置了角色且令牌中用户角色位于其中
        return true;
      }
    }
  }
}
