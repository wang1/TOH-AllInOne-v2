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
