import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Output() showSignIn = new EventEmitter();
  signUpForm: FormGroup;
  DOMAIN_NAME = 'inmar.com';
  emailPattern = new RegExp("^[A-Za-z0-9._%+-]+@" + this.DOMAIN_NAME + "$", "gi");

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeSignUpForm();
  }

  initializeSignUpForm() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      lastName: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      aadhar: ['', Validators.pattern(/^[0-9]{12}/)],
      password: ['', Validators.compose([Validators.pattern(/^(?=.*[a-z])(?=.*[!"#...\d]).{8,}$/), Validators.required])]
    });
  }

  submitSignUp() {
    this.showSignIn.next();
  }
}
