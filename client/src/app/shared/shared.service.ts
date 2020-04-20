import { Injectable, NgZone } from '@angular/core';
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

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private zone: NgZone,
  ) { }

  openSnackBar(info: string): void {
    this.snackBar.open(info, '关闭');
  }

  loginedConfig(loginUsername: string, token: string): void {
    this.isLogined = true;
    this.loginUsername = loginUsername;
    // this.autoRefreshToken();
    // const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    // console.log(expiry);
    // console.log((Math.floor(Date.now() / 1000)));

    // You might be tempted to persist it in localstorage or cookies;
    // don’t do it! This is prone to XSS or CSRF attacks.
    // 参见https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/
    // 改为规定格式，以后直接取token使用，无需改变
    // "Authorization": "Bearer eyJhbGcivzz_Mew11YNsCKxzFKqUL1EMNMiuNsX2_OdDyk-JZQ"
    this.token = `Bearer ${token}`;
    this.openSnackBar(`${loginUsername}登录成功！`);
    // 登录成功，导向原先想去的url，否则显示列表
    this.router.navigateByUrl(this.redirectUrl);
  }
  // 原打算对token自动更新，网上的方案是双token等被动更新
  // 问题是假设用户是在编辑某数据，点击提交，程序发现返回的是token过期，从而程序自动更新，但用户的输入会丢失
  // （应该可以处理，没深究，参见https://itnext.io/angular-tutorial-implement-refresh-token-with-httpinterceptor-bfa27b966f57！
  // 然后打算自己主动更新，即设置如下之类的计时器进行定时更新
  // autoRefreshToken(): void {
  //   timer(0, 1000).pipe(
  //     switchMap(() => this.loginService.login()), // 再次登录
  //   ).subscribe(val => console.log(val)); // 获得新token，写到变量中
  // }

  logoutConfig(): void {
    this.openSnackBar(`${this.loginUsername}登出成功！`);
    this.isLogined = false;
    this.loginUsername = '';
    this.token = '';
    // this.redirectUrl = '/hero-list';
    // this.router.navigateByUrl(this.redirectUrl);
    this.router.navigate(['']);
  }
  // 参考https://www.apollographql.com/docs/angular/features/error-handling/
  // https://blog.apollographql.com/full-stack-error-handling-with-graphql-apollo-5c12da407210
  // 捕获的error只是字符串，格式类似“Error: GraphQL error: Bad Request Exception”
  // 当前未找到好的处理方式，自己分析进行处理了如下几种
  pharseAndHandleError(error: string): void {
    // 必须保证error为string，否则error.includes()报错
    if (typeof error === 'string' && error.includes(ERROR_TYPE.NETWORK_ERR)) {
      this.errorMessage = ERROR_MESSAGE.NETWORK_ERR;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.BAD_REQ)) {
      this.errorMessage = ERROR_MESSAGE.BAD_REQ;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.UNAUTHORIZED)) {
      this.errorMessage = ERROR_MESSAGE.UNAUTHORIZED;
    } else if (typeof error === 'string' && error.includes(ERROR_TYPE.FORBIDDEN)) {
      this.errorMessage = ERROR_MESSAGE.FORBIDDEN;
    } else {
      this.errorMessage = ERROR_MESSAGE.OTHERS;
    }

    // 此处如果直接显示snackbar将会出现位置错误，原因如下：
    // This is actually working as expected. 
    // The executions in ErrorHandler are not invoking a change detection cycle. 
    // Because execution of the handleError method in your GlobalErrorHandler occur outside of change 
    // detection, the snackbar will not show as "opened" until the next change detection cycle runs.
    // For handling errors generically for HttpRequests, I would recommend using an HttpInterceptor
    // 所以需要这样启动，没深究！！！
    this.zone.run(() => {
      this.openSnackBar(this.errorMessage);
    });
  }
}
