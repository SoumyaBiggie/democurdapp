import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginPage: boolean = true;
  registerData: any = [];
  loginForm: FormGroup;
  regForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
    });
    this.regForm = new FormGroup({
      uname: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required]),
      mob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  loadRegister() {
    this.loginPage = false;
  }
  loadLogin() {
    this.loginPage = true;
  }
  login() {
    let formdata = this.loginForm.value;
    let loginData = JSON.parse(sessionStorage.getItem('loginData') as any);
    if (loginData) {
      let op = loginData.find((x: any) => {
        if (x.uname == formdata.uname && x.pwd == formdata.pwd) {
          return true;
        }
      });
      if (op) {
        this.router.navigate(['/dashboard']);
        this.loginForm.reset();
      } else {
        alert('wrong credential');
        this.loginForm.reset();
      }
    } else {
      alert('user not found, kindly register');
    }
  }
  registerUser() {
    let formdata = this.regForm.value;
    let val = JSON.parse(sessionStorage.getItem('loginData') as any);
    if (val) {
      let op = val.find((x: any) => {
        return x.uname == formdata.uname
      });
      if (op) {
        alert('user already exist');
      } else {
        val.push(formdata);
        sessionStorage.setItem('loginData', JSON.stringify(val));
        alert('user registered');
        this.regForm.reset();
      }
    } else {
      this.registerData.push(formdata);
      sessionStorage.setItem('loginData', JSON.stringify(this.registerData));
      alert('user registered');
      this.regForm.reset();
    }
  }

}
