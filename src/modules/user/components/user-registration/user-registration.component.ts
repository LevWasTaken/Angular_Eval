import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserQueries } from '../../services/user.queries';
class UserRegistrationFormModel {
  username = "";
  password = "";
  confirmPassword = "";
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.less']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  model = new UserRegistrationFormModel();

  constructor(
    private router: Router,
    private userService: UserService,
    private userQueries: UserQueries
  ) { }

  ngOnInit(): void {
  }

  async submit() {

    // TODO  Vérifier que la confirmation de mot de passe correspond au mot de passe
    if (this.model.password !== this.model.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if(!this.model.username || !this.model.password) {
      alert("Veuillez saisir un nom d'utilisateur et un mot de passe");
      return;
    }
    // TODO  Vérifier que le nom d'utilisateur n'est pas déjà utilisé
    const user = await this.userQueries.exists(this.model.username);
    console.log(user);
    if (user !== false) {

      alert("Ce nom d'utilisateur est déjà utilisé");
      return;
    }

    

    // TODO Enregistrer l'utilisateur via le UserService
    this.goToLogin();
  }

  goToLogin() {
  
    this.userService.register(this.model.username, this.model.password);
    // TODO rediriger l'utilisateur sur "/splash/login"
    this.router.navigate(['/splash/login']);
  }
}
