import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ERROR_TYPE, ERROR_MESSAGE } from './constants';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // 是否正在HTTP请求, 在拦截器中设置
  isLoading = false;
  // 是否登录了
  isLogined = false;
  // 登录后的用户名, 显示在页面右上角
  loginUsername: string;
  // 保存用户的令牌
  token: string;
  // 保存用户登录前要去的url以登录成功后导向。默认首页。
  redirectUrl = '/hero-list';
  // 错误消息
  errorMessage = '';

  constructor( private snackBar: MatSnackBar, private router: Router ) { }

  openSnackBar(info: string): void {
    this.snackBar.open(info, '关闭');
  }

  loginedConfig(loginUsername: string, token: string): void {
    this.isLogined = true;
    this.loginUsername = loginUsername;
    // 改为规定格式，以后直接取token使用，无需改变
    // "Authorization": "Bearer eyJhbGcivzz_Mew11YNsCKxzFKqUL1EMNMiuNsX2_OdDyk-JZQ"
    this.token = `Bearer ${token}`;
    this.openSnackBar(`${loginUsername}登录成功！`);
    // 登录成功，导向原先想去的url，否则显示列表
    this.router.navigateByUrl(this.redirectUrl);
  }

  logoutConfig(): void {
    this.openSnackBar(`${this.loginUsername}登出成功！`);
    this.isLogined = false;
    this.loginUsername = '';
    this.token = '';
    this.redirectUrl = '/hero-list';
    this.router.navigateByUrl(this.redirectUrl);
  }

  pharseError(error: string): void {
    // 必须保证error为string，否则报错
    if (typeof error === 'string' && error.includes(ERROR_TYPE.NETWORK_ERR)) {
      this.errorMessage = ERROR_MESSAGE.NETWORK_ERR;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.BAD_REQ)) {
      this.errorMessage = ERROR_MESSAGE.BAD_REQ;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.UNAUTHORIZED)) {
      this.errorMessage = ERROR_MESSAGE.UNAUTHORIZED;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.FORBIDDEN)) {
      this.errorMessage = ERROR_MESSAGE.FORBIDDEN;
    } else {
      this.errorMessage = ERROR_MESSAGE.OTHER;
    }
  }
}
