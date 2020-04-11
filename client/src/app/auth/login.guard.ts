import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private sharedService: SharedService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): boolean {
    if (this.sharedService.isLogined) {
      return true;
    }
    //  保存用户要去的url, 其经过验证后将会自动导向该页面
    this.sharedService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
