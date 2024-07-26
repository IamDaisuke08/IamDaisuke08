import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUser } from '@models/appuser';
import { AuthorisationService } from '@services/auth-service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [[CommonModule, ReactiveFormsModule],],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup
  unsuccessful : boolean | null = null;

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private auth : AuthorisationService, private router : Router) {}

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
    this.auth.LogIn(user, pwd).subscribe({
      next: (user : any) => {
          let appUser : AppUser = user;
          sessionStorage.setItem('username', appUser.name);
          sessionStorage.setItem('email', appUser.email);
          sessionStorage.setItem('loginToken', appUser.token);
          this.auth.user$.next(appUser);
          this.router.navigate(['']);
      },
      error: (error : any) => {
        console.log(error);
        this.unsuccessful = true; 
      }
    });
  }
}
