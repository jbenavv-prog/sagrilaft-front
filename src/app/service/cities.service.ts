import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) { }

  getAccessToken(url: string, token: string, email: string) {
    const headers = {
      "Accept": "application/json",
      "api-token": token,
      "user-email": email
    }

    const requestOptions = {
      headers: new HttpHeaders(headers)
    };

    return this.http.get(url, requestOptions).pipe(
      map((applicants: any[]) => {
        return applicants;
      })
    );
  }

  getApiRequest(url: string, token: string): Observable<any[]> {
    const headerDict = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };

    return this.http.get(url, requestOptions).pipe(
      map((applicants: any[]) => {
        return applicants;
      })
    );
  }
}
