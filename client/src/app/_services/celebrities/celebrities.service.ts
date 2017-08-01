import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';

@Injectable()
export class CelebritiesService {

  constructor(
    private config: AppConfig,
    private http: Http) { }

  getCelebrities(page) {
    return this.http
      .get(`${this.config.api}/celebrities/${page}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getCelebritie(id) {
    return this.http
      .get(`${this.config.api}/celebritie/${id}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getCelebritieImages(id, page) {
    return this.http
      .get(`${this.config.api}/celebritie/${id}/tagged_images/${page}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error ', JSON.parse(error._body).message);
    return Promise.reject(JSON.parse(error._body) || error);
  }
}
