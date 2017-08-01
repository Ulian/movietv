import { Injectable } from '@angular/core';

import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { AppConfig } from '../../app.config';

@Injectable()
export class CollectionsService {
  constructor(
    private config: AppConfig,
    private http: Http) { }

  getCollection(id) {
    return this.http
      .get(`${this.config.api}/collection/${id}`)
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
