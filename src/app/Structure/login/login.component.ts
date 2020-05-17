import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../_Services/connection-service';
import {Router} from '@angular/router';
import {User} from '../../_Models/user';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private connService: ConnectionService, private router: Router) { }

  ngOnInit() {
    sessionStorage.setItem('token', '');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const DTO = {email : this.loginForm.controls.username.value, password : this.loginForm.controls.password.value};
    this.connService.connect(DTO).subscribe( response => {
      if (response.aBoolean === true) {
        if (response.msg.includes('|ROLE ADMIN')) {
          this.router.navigateByUrl('/dashboard/path/read');
        } else {
          window.alert('Identifiants incorrects');
          this.loginForm.reset();
        }
      } else {
        window.alert(response.msg);
        this.loginForm.reset();
      }
    });
  }
}
