import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthMicrosoftService } from './auth-microsoft.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graphClient: Client;

  constructor(private authService: AuthMicrosoftService) {
    // Initialize the Graph client
    this.graphClient = Client.init({
      authProvider: async (done) => {
        // Get the token from the auth service
        const token = await this.authService.getAccessToken()
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
  }

  async getPhoto() {
    const respuestaBlob = await this.graphClient
      .api('/me/photos/96x96/$value').get();
    return respuestaBlob;
  }

  // async uploadFiles() {
  //   const response = await this.graphClient.api.
  // }
}
