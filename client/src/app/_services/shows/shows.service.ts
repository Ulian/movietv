import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';

@Injectable()
export class ShowsService {
  constructor(
    private config: AppConfig,
    private http: Http) { }

  getShows(state, page) {
    return this.http
      .get(`${this.config.api}/tvshows/${state}/${page}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getShow(id) {
    return this.http
      .get(`${this.config.api}/tvshow/${id}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getSeason(id, number) {
    return this.http
      .get(`${this.config.api}/season/${id}/${number}`)
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
