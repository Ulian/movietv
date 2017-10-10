import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { handleError } from '../helper';

@Injectable()
export class ShowsService {
  constructor(
    private config: AppConfig,
    private http: Http) { }

  getShows(state, page) {
    return this.http
      .get(`${this.config.api}/tvshows/${state}/${page}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }

  getShow(id) {
    return this.http
      .get(`${this.config.api}/tvshow/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }

  getSeason(id, number) {
    return this.http
      .get(`${this.config.api}/season/${id}/${number}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }
}
