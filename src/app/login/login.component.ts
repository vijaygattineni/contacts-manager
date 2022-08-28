import { Component, OnInit } from '@angular/core';
import { VIEW } from '../contact-enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  currentView: String = 'signIn';
  VIEW = VIEW;

  constructor() { }

  ngOnInit() {
  }

  showSignUpForm() {
    this.currentView = 'signUp';
  }

  showSignInForm() {
    this.currentView = 'signIn';
  }

}
