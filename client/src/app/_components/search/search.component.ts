import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchService } from '../../_services/index';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search_term: string;
  search: object;

  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.search_term = params['query'];
        this.searchService.search(this.search_term)
          .then(response => {
            this.search = response;
          });
      });
  }
}
