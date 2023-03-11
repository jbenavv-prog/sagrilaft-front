import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from 'src/assets/class/user';
import { Client } from '@microsoft/microsoft-graph-client';
import { environment, OAuthSettings } from 'src/environments/environment';
import { Router } from '@angular/router';
import * as _moment from 'moment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  
  ngOnInit() {
  }

  isAuthenticated() {
    const token = localStorage.getItem('Token');
    if (!token || token.length < 2) {
      return false;
    }
    const decoded: any = jwt_decode(token);
    var dateString = _moment.unix(decoded.exp).toDate();
    if (dateString > new Date()) {
      return true;
    } else {
      localStorage.removeItem('Token');
      localStorage.removeItem('google_auth');
      return false;
    }
  }
}
