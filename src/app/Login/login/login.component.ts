import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthGoogleService } from 'src/app/service/auth-google.service';
import { AuthMicrosoftService } from 'src/app/service/auth-microsoft.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authGoogle: SocialAuthService,
    public authMicrosoftService: AuthMicrosoftService,
    public authGoogleService: AuthGoogleService,
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('Token')) {
      this.router.navigateByUrl('/home');
    }
  }

  signInHandlerGoogle(): void {
    this.authGoogle.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));
      if (data) {
        this.authGoogleService.login(data.email, data.id, data.name);
      }
    });
  }

  async signInHandlerMicrosoft(): Promise<void> {
    await this.authMicrosoftService.signIn();
  }
}

