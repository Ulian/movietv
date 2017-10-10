import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { handleError } from '../helper';

@Injectable()
export class CelebritiesService {

  constructor(
    private config: AppConfig,
    private http: Http) { }

  getCelebrities(page) {
    return this.http
      .get(`${this.config.api}/celebrities/${page}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }

  getCelebritie(id) {
    return this.http
      .get(`${this.config.api}/celebritie/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }

  getCelebritieImages(id, page) {
    return this.http
      .get(`${this.config.api}/celebritie/${id}/tagged_images/${page}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }
}
