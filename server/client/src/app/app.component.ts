import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CRM';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('authToken')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
  }
}
