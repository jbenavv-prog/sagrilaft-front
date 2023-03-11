import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EconomicActivitiesService {

  url: string = 'assets/data/economicActivities.json';

  constructor(private httpClient: HttpClient) { }

  getEconomicActivities() {
    return this.httpClient.get(this.url).
      pipe(map(respuesta => respuesta));
  }
}
