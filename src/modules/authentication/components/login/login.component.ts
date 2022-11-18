import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthenticationService } from '../../services/authentication.service';

class LoginFormModel {
  username = '';
  password = '';
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  @ViewChild(NgForm, { static: false })
  ngForm: NgForm;

  model = new LoginFormModel();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private nzMessageService: NzMessageService
  ) {}

  ngOnInit(): void {
    this.model.username = '';
    this.model.password = '';
  }

  goToPage(pageName: string) {
    console.log(pageName)
    this.router.navigate([`${pageName}`]);
  }

  submit() {
    this.login();
  }

  async login() {
    console.log(this.model.username, this.model.password);
    if (this.ngForm.form.invalid) {
      return;
    }
    console.log("tentative de connexion");
    try {
      // TODO vérifier le résultat de l'authentification. Rediriger sur "/" en cas de succès ou afficher une erreur en cas d'échec
      const result = await this.authService.authenticate(this.model.username, this.model.password);
      console.log(result);
      if (result.success) {
        this.router.navigate(['/']);
      } else {
        alert(result.reason)
      }
    } catch (error) {
      alert(error);
    }
  }
}
