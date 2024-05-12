import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { UserService } from 'src/app/service/user.service';
import { TokenService } from './token.service';

const API_URL = environment.BASE_API;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  authenticate(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    };

    return this.http.post(`${API_URL}/login`, body.toString(), options).pipe(
      tap((res) => {
        const authToken = res.acess_token;
        this.userService.setToken(authToken);
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
