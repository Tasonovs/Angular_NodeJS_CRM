import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/interfaces";
import { tap } from "rxjs/operators"

//TODO ???
@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string = ''

  constructor(private http: HttpClient) {}

  register(user: User){
    return this.http.post<{token: string}>('/api/auth/register', user)
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(tap( ({token}) => {
        localStorage.setItem('authToken', token)
        this.setToken(token)
      }))
  }

  setToken(token: string) {
    this.token = token
  }

  getToken():string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken('')
    localStorage.clear()
  }
}
