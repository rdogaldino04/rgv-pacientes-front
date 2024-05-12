import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../core/auth/token.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import * as jtw_decode from 'jwt-decode';

const API_URL = environment.BASE_API;

@Injectable({ providedIn: 'root' })
export class UserService {
  private username: string;

  constructor(private tokenService: TokenService, private http: HttpClient) {}

  setToken(token: string): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  private decodeAndNotify(): void {
    const user = this.decode();
    this.username = user.username;
  }

  public decode(): User {
    if (!this.tokenService.hasToken()) {
      return null;
    }
    const token = this.tokenService.getToken();
    const payload = jtw_decode.default(token) as jtw_decode.JwtPayload;
    const user = {
      id: null,
      name: null,
      username: payload.sub,
      roles: payload['roles'],
    };
    return user;
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  logout(): void {
    this.tokenService.removeToken();
  }
}
