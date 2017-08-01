import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShowsService } from '../../_services/index';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.css']
})
export class TvShowsComponent implements OnInit {
  shows: string[];
  page: number;
  state: string;
  total_pages: number;
  no_more_pages = false;
  shows_loading = true;

  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.page = +params['page'];
        this.state = params['state'];
        this.shows = [];
        this.moreShows(false);
      });
  }

  moreShows(add) {
    this.shows_loading = true;
    this.loadShows(this.state, (add) ? ++this.page : this.page);
  }

  loadShows(state, page) {
    if (!this.no_more_pages) {
      this.showsService.getShows(state, page)
        .then(response => {
          this.shows_loading = false;
          this.total_pages = response.total_pages;
          if (this.shows === undefined) {
            this.shows = response.results;
          } else {
            response.results.forEach(show => {
              this.shows.push(show);
            });
          }
        });
      if (page >= this.total_pages) {
        this.no_more_pages = true;
        return;
      }
    } else {
      this.no_more_pages = true;
    }
  }
}
