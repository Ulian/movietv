import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShowsService } from '../../_services/index';

import { Pagination } from '../../_interfaces/index';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  shows: string[];
  pagination = new Pagination();

  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.pagination.page = +params['page'];
        this.pagination.state = params['state'];
        this.shows = [];
        this.moreShows(false);
      });
  }

  moreShows(add) {
    this.pagination.loading = true;
    this.loadShows(this.pagination.state, (add) ? ++this.pagination.page : this.pagination.page);
  }

  loadShows(state, page) {
    if (!this.pagination.no_pages_left) {
      this.showsService.getShows(state, page)
        .then(response => {
          this.pagination.loading = false;
          this.pagination.total_pages = response.total_pages;
          if (this.shows === undefined) {
            this.shows = response.results;
          } else {
            response.results.forEach(show => {
              this.shows.push(show);
            });
          }
        });
      if (page >= this.pagination.total_pages) {
        this.pagination.no_pages_left = true;
        return;
      }
    } else {
      this.pagination.no_pages_left = true;
    }
  }
}
