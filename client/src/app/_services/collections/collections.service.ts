import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';
import { handleError } from '../helper';

@Injectable()
export class CollectionsService {
  constructor(
    private config: AppConfig,
    private http: Http) { }

  getCollection(id) {
    return this.http
      .get(`${this.config.api}/collection/${id}`)
      .toPromise()
      .then(response => response.json())
      .catch(handleError);
  }
}
