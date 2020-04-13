import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { SharedService } from './shared.service';

// 全局error处理器，引入myProviders后导入到appModule中

@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {

  constructor(private sharedService: SharedService, private zone: NgZone) { }

  handleError(error) {
    console.log(error.message); // 开发阶段有效，产品阶段无用。应该上传相关错误到服务器，如果网络正常的话
    // 分析错误类型然后显示
    this.sharedService.pharseAndHandleError(error.message);
  }
}


