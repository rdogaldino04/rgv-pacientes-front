import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { HeaderService } from '../core/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['1234', Validators.required],
    });
  }

  login(): void {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.authenticate(username, password).subscribe(
      () => {
        this.headerService.showMenuSubject$.next(true);
        this.router.navigate(['home']);
      },
      (err) => {
        this.loginForm.reset();
      }
    );
  }
}
