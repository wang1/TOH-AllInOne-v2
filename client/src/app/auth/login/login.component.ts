import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private sharedService: SharedService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      // role: [ROLES.TEACHER],
    });
  }
  // 登录如果有错，则被全局错误拦截并显示错误信息，此次是登录成功的处理
  // 下面data的写法请注意不能错： ({ data })
  login() {
    this.loginService.login(this.loginForm.value).subscribe( ({ data })  => {
      const token = data.login.token;
      if (token) {
        this.sharedService.loginedConfig(this.loginForm.value.username, token);
      }
    });
  }

  logout() {
    this.sharedService.logoutConfig();
  }

}
