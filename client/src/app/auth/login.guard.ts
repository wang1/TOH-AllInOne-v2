import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import { ERROR_MESSAGE } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) { }
  // 重写canActivate方法，返回true才能按路由配置中的路由进行导航
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.sharedService.isLogined) {
      return true;
    }
    //  保存用户要去的url, 其经过验证后将会自动导向该页面
    this.sharedService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    this.sharedService.openSnackBar(ERROR_MESSAGE.NEED_lOGIN);
    return false;
  }
}
