import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SagrilaftService {
  constructor(
    private httpClient: HttpClient
  ) { }

  headers = new HttpHeaders({
    authorization: localStorage.getItem('Token'),
    apiKeyToken: environment.PUBLIC_API_KEY_TOKEN_CUSTOMERS_CREATE
  });

  headers2 = new HttpHeaders({
    authorization: localStorage.getItem('Token'),
    apiKeyToken: environment.PUBLIC_API_KEY_TOKEN_CUSTOMERS_UPDATE
  });

  createCustomer(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/createCustomer`, { request }, { headers: this.headers });
  }

  updateCustomer(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/updateCustomer`, { request }, { headers: this.headers2 });
  }

  getInitialData(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getInitialData`, { request }, { headers: this.headers2 });
  }

  createAssociates(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/createAssociates`, { request }, { headers: this.headers2 });
  }

  getAssociates(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getAssociates`, { request }, { headers: this.headers2 });
  }

  createFinancialInfo(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/createFinancialInfo`, { request }, { headers: this.headers2 });
  }

  getFinancialInfo(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getFinancialInfo`, { request }, { headers: this.headers2 });
  }

  createMoneyLaundery(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/createMoneyLaundery`, { request }, { headers: this.headers2 });
  }

  getMoneyLaundery(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getMoneyLaundery`, { request }, { headers: this.headers2 });
  }

  createStatements(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/createStatements`, { request }, { headers: this.headers2 });
  }

  getStatements(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getStatements`, { request }, { headers: this.headers2 });
  }


  insertDocuments(formData: any, account: any) {

    const params = new HttpParams({ fromString: `email=${account.email}` });

    return this.httpClient.post<any>(`${environment.apiUrl}/api/files/insertDocuments`, formData, { headers: this.headers2, params })
      .pipe(map(respuesta => respuesta));
  }

  getDocuments(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/getDocuments`, { request }, { headers: this.headers2 });
  }

  sendConfirmationMail(request: any) {
    return this.httpClient.post<any>(`${environment.apiUrl}/api/sagrilaft/sendConfirmationMail`, { request }, { headers: this.headers2 });
  }
}
