import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/layouts/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
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

    this.authSub = this.auth.register(this.form.value).subscribe(
      res => {
        this.router.navigate(['/login'], {queryParams: {reqistered: true}})
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
