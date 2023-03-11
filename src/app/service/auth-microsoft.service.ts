import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Client } from '@microsoft/microsoft-graph-client';
import { map } from 'rxjs/operators';
import { User } from 'src/assets/class/user';
import { environment, OAuthSettings } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
import * as _moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthMicrosoftService {
  constructor(private msalService: MsalService, private httpClient: HttpClient, private route: Router) { }

  public isAuthenticated: boolean;
  public user: User;
  datos: any;
  token = '';

  ngOnInit() {
    this.isAuthenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => { this.user = user; });
  }


  async signIn(): Promise<void> {
    const result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
      });
    if (result) {
      this.isAuthenticated = true;
      this.user = await this.getUser();
      this.login();
    }
  }

  login() {
    const headers = new HttpHeaders({
      'apiKeyToken': environment.PUBLIC_API_KEY_TOKEN_CUSTOMERS_CREATE
    });
    const data = {
      email: this.user.email,
      password: this.user.id,
      names: this.user.displayName
    };
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/auth/sign-in`, data, { headers })
      .pipe(map(respuesta => respuesta)).subscribe((respuesta: any) => {
        if (respuesta.token) {
          localStorage.setItem('Token', `Bearer ${respuesta.token}`);
          this.route.navigateByUrl('/home');
        } else {
        }
      });
  }

  signOut(): void {
    this.readToken();
    this.msalService.logout();
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem('Token');
    this.token = '';
    // this.datos = '';
    this.route.navigateByUrl('/login');
  }

  private async getUser(): Promise<User> {
    if (!this.isAuthenticated) { return null; }

    const graphClient = Client.init({
      authProvider: async (done) => {
        const token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    const graphUser = await graphClient.api('/me').get();
    const user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.jobTitle = graphUser.jobTitle;
    user.avatar = graphUser.avatar;
    user.id = graphUser.id;
    return user;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    const result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
      });

    if (result) {
      return result.accessToken;
    }

    return null;
  }

  readToken() {
    const token = localStorage.getItem('Token');
    if (token) {
      const decoded: any = jwt_decode(token);
      var dateString = _moment.unix(decoded.exp).toDate();

      if (dateString > new Date()) {
        return true;
      } else {
        localStorage.removeItem('Token');
        return false;
      }
    } else {
      return false;
    }
  }
}
