import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  @Output() showSignUp = new EventEmitter();

  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.initializeSignInForm();
  }

  initializeSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  showSignUpForm() {
    this.showSignUp.next();
  }

  submitSignIn() {
    localStorage.setItem('token','s123$');
    this.router.navigate(['/contacts']);
  }
}
