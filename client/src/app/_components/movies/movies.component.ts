import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../_services/index';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: string[];
  page: number;
  state: string;
  total_pages: number;
  no_more_pages = false;
  movies_loading = true;

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.page = +params['page'];
        this.state = params['state'];
        this.movies = [];
        this.moreMovies(false);
      });
  }

  moreMovies(add) {
    this.movies_loading = true;
    this.loadMovies(this.state, (add) ? ++this.page : this.page);
  }

  loadMovies(state, page) {
    if (!this.no_more_pages) {
      this.moviesService.getMovies(state, page)
        .then(response => {
          this.movies_loading = false;
          this.total_pages = response.total_pages;
          if (this.movies === undefined) {
            this.movies = response.results;
          } else {
            response.results.forEach(movie => {
              this.movies.push(movie);
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
