import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) { }

  login(email: any, id: any, name: any) {
    const headers = new HttpHeaders({
      'apiKeyToken': environment.PUBLIC_API_KEY_TOKEN_CUSTOMERS_CREATE
    });
    const data = {
      email: email,
      password: id,
      names: name
    };
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/auth/sign-in`, data, { headers })
      .pipe(map(respuesta => respuesta)).subscribe((respuesta: any) => {
        if (respuesta.token) {
          localStorage.setItem('Token', `Bearer ${respuesta.token}`);
          this.router.navigateByUrl('/home');
        } else {
        }
      });
  }
}
