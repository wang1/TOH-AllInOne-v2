import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddTokenInterceptor } from './addToken.interceptor';
import { ErrorHandler } from '@angular/core';
import { AppGlobalErrorHandler } from './app-global.ErrorHandler';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// 考虑创建一个封装桶（barrel）文件，用于把所有拦截器、全局错误处理器等都收集起来，一起提供给MyProviders 数组
// 然后将其提供在appModule中
export const myProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
  { provide: ErrorHandler, useClass: AppGlobalErrorHandler },
  { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
];
