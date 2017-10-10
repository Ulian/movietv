import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { handleError } from '../helper';

@Injectable()
export class MoviesService {

  constructor(
    private config: AppConfig,
    private http: Http) { }

  getMovies(state, page) {
    return this.http
      .get(`${this.config.api}/movies/${state}/${page}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }

  getMovie(id) {
    return this.http
      .get(`${this.config.api}/movie/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }
}
