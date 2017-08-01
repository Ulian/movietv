import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';

@Injectable()
export class MoviesService {

  constructor(
    private config: AppConfig,
    private http: Http) { }

  getMovies(state, page) {
    return this.http
      .get(`${this.config.api}/movies/${state}/${page}`)
      .toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getMovie(id) {
    return this.http
      .get(`${this.config.api}/movie/${id}`)
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
