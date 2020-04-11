import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize, delay, retry } from 'rxjs/operators';
import { SharedService } from './shared.service';

// http拦截器，顺便设置是否在加载isLoading
@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private sharedService: SharedService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // ExpressionChangedAfterItHasBeenCheckedError is a development check to ensure 
    // bindings update in a manner Angular expects.
    // The order of change detection when it run is as follows:
    // 1. OnInit, DoCheck, OnChanges
    // 2. Renders
    // 3. Change detection runs on child views
    // 4. AfterViewChecked, AfterViewInit

    // 此处需要这样，否则会引发上面的异常，跟生命周期有关
    // 因为其在appComponent中的ngIf使用，而该组件初始化时得知其为false。同时因发起了网络请求，被拦截后马上isLoading设为true，
    // 那么就发生了刚刚检查DoCheck是false，立刻就变成了true的异常事件，而此时组件还未呈现
    // 所以此处不设置值，发起网络请求时直接设置为true，取数据过程中组件开始呈现（进度条显示）
    // 网络请求返回后，isLoaing置为false，进度条消失

    // Instead of using setTimeout to dispatch 设置isLoading to the event queue, 
    // a more elegant solution is using Promise.resolve(null).then(). 
    // This results in it dispatching after Angular double checks for changes.
    // 保证在两次检查后执行而不是在之间

    Promise.resolve(null).then(() => this.sharedService.isLoading = true);
    // Get the auth token from the service.
    // const authToken = this.auth.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    // Clone the request and set the new header in one step.
    // const authReq = req.clone({ setHeaders: { Authorization: authToken } });

    // 头部验证也可放在Apollo的Graphql模块中，参见https://www.apollographql.com/docs/angular/recipes/authentication/ 
    // req及res都是不可变对象，所以需要clone
    const newReq = this.sharedService.token ? req.clone({ setHeaders: { Authorization: this.sharedService.token } }) : req;

    return next.handle(newReq)
      .pipe(
        retry(2), // 总共3次，在网络烂时有效
          // delay(1000),
        // RxJS 的 tap 操作符会捕获请求成功了还是失败了。 
        // RxJS 的 finalize 操作符无论在响应成功还是失败时都会调用（这是必须的），然后把结果汇报给 sharedService。
        // 返回response后，暂时只设置isLoading
        // tap(
          // Succeeds when there is a response; ignore other events
          // event => this.isLoading = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          // error => ok = 'failed'
          // event => this.sharedService.isLoading = false
        // ),
        // 当网络反应快速时可能发生闪动！！！
        finalize(() => this.sharedService.isLoading = false)
      );
  }
}
