import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '@models/appuser';
import { AuthorisationService } from '@services/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  standalone: true,
  imports: [[CommonModule, ReactiveFormsModule],],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {


  loginForm! : FormGroup
  unsuccessful : boolean | null = null;

  auth = inject(AuthorisationService);
  router = inject(Router);

  logSubs!: Subscription;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnDestroy(): void {
    this.logSubs?.unsubscribe();
  }

  ngOnInit(): void {
    this.newLoginForm();
  }

  newLoginForm() {
    this.loginForm = new FormGroup({
      username:  new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  logIn() {
    let user = this.username == null ? '' : this.username.value;
    let pwd = this.password == null ? '' : this.password.value;
    this.logSubs = this.auth.LogIn(user, pwd).subscribe({
      next: (user : any) => {
          // sessionStorage.setItem('username', appUser.name);
          // sessionStorage.setItem('email', appUser.email);
          // sessionStorage.setItem('loginToken', appUser.token);
          this.auth.user$.next(user);
          this.router.navigate(['']);
      },
      error: (error : any) => {
        console.log(error);
        this.unsuccessful = true; 
      }
    });
  }
}
