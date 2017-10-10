import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { handleError } from '../helper';

@Injectable()
export class SearchService {

  constructor(
    private config: AppConfig,
    private http: Http) { }

  search(query) {
    return this.http
      .get(`${this.config.api}/search/${query}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }
}
