import { Component } from '@angular/core';
import { slideInAnimation } from './shared/app.animations';
import { RouterOutlet, Router } from '@angular/router';
import { SharedService } from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  title = 'TOH-英雄之旅';

  constructor(public sharedService: SharedService, private router: Router) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.sharedService.isLogined = false;
    this.router.navigate(['']);
  }
}
