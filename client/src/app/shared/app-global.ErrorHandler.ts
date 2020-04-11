import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SharedService } from './shared.service';

// 全局error处理器，引入myProviders后导入到appModule中
// 参考https://www.apollographql.com/docs/angular/features/error-handling/
// https://blog.apollographql.com/full-stack-error-handling-with-graphql-apollo-5c12da407210
// 捕获的error只是字符串，格式类似“Error: GraphQL error: Bad Request Exception”
// 当前未找到好的处理方式，自己分析进行处理了如下几种
@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {

  constructor(private sharedService: SharedService, private zone: NgZone) { }

  handleError(error) {
    console.log(error.message); // 开发阶段有效，产品阶段无用。应该上传相关错误到服务器，如果网络正常的话
    // 分析错误类型
    this.sharedService.pharseError(error.message);
    // 此处如果直接显示snackbar将会出现位置错误，原因如下：
    // This is actually working as expected. 
    // The executions in ErrorHandler are not invoking a change detection cycle. 
    // Because execution of the handleError method in your GlobalErrorHandler occur outside of change 
    // detection, the snackbar will not show as "opened" until the next change detection cycle runs.
    // For handling errors generically for HttpRequests, I would recommend using an HttpInterceptor
    // 所以需要这样启动，没深究！！！
    this.zone.run(() => {
      this.sharedService.openSnackBar(this.sharedService.errorMessage);
    });
  }
}


