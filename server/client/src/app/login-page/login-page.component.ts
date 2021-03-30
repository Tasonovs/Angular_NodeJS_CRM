import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/layouts/services/auth.service';
import { MaterialService } from '../shared/layouts/services/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  //TODO ???
  authSub = new Subscription
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Авторизация успешна
      } else if (params['accessDenied']) {
        // Необходима авторизация
      }
    })
  }

  ngOnDestroy() {
    if (this.authSub) this.authSub.unsubscribe()
  }

  onSubmit() {
    this.form.disable()

    this.authSub = this.auth.login(this.form.value).subscribe(
      res => {
        this.router.navigate(['/overview'])
        console.log("Login success")
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.message) //TODO error.error.message???
        console.warn(error.error.message)
        this.form.enable()
      }
    )
  }

}
