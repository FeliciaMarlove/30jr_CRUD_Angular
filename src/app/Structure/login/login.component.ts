import {Component, OnInit} from '@angular/core';
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
/**
 * Connexion à l'application.
 */
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(private fb: FormBuilder, private connService: ConnectionService, private router: Router) {
  }

  /**
   * Vérifie si un utilisateur est connecté et navigue vers le tableau de bord si c'est le cas.
   * Instancie un formulaire réactif avec les champs suivants :
   *  username (requis) : l'identifiant de connexion
   *  password (requis) : le mot de passe
   */
  ngOnInit() {
    if (sessionStorage.getItem('auth') !== null) {
      this.router.navigateByUrl('/dashboard/path/read');
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Effectue une tentative de connexion avec l'identifiant et le mot de passe renseignés dans le formulaire.
   * Vérifie que le rôle de l'utilisateur est "administrateur" et :
   *  Définit l'utilisateur comme autentifié.
   *  Navigue vers le tableau de bord.
   * Si l'utilisateur n'a pas le statut d'administrateur, nettoie la variable de session et affiche une alerte.
   * Si les identifiants ne sont pas corrects, nettoie la variable de session et affiche une alerte.
   */
  onLogin() {
    const DTO = {email: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value};
    this.connService.connect(DTO).subscribe(response => {
        if (response !== null && response.userRole === 'ADMIN') {
          this.connService.authenticated = true;
          this.router.navigateByUrl('/dashboard/path/read');
        } else {
          /*
          L'utilisateur existe mais ce n'est pas un "admin"
           */
          sessionStorage.setItem('auth', undefined);
          sessionStorage.clear();
          this.loginForm.reset();
          window.alert('Identifiants incorrects');
        }
      },
      /*
      L'utilisateur ne se trouve pas en base de données OU le mot de passe est incorrect
       */
      () => {
        sessionStorage.setItem('auth', undefined);
        sessionStorage.clear();
        this.loginForm.reset();
        window.alert('Identifiants incorrects');
      }
    );
  }
}
