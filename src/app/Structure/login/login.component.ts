import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConnectionService} from '../../Services/connection-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private connService: ConnectionService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const DTO = {email : this.loginForm.controls.username.value, password : this.loginForm.controls.password.value}
    this.connService.connect(DTO).subscribe( response => {
      if (response.aBoolean === true) {
        if (response.msg.includes('|ROLE ADMIN')) {
          // TODO : navigate to admin dashboard but gérer AuthN/AuthZ avec le back !
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
