import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          Authorisation: this.auth.getToken()
        }
      })
    }
    return next.handle(req) //TODO Обработка ошибок при истечении времени токена
  }


  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {

    }
    return throwError(error)
  }
}
