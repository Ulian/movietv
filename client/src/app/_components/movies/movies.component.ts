import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../../_services/index';

import { Pagination } from '../../_interfaces/index';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: string[];
  pagination = new Pagination();

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.pagination.page = +params['page'];
        this.pagination.state = params['state'];
        this.movies = [];
        this.moreMovies(false);
      });
  }

  moreMovies(add) {
    this.pagination.loading = true;
    this.loadMovies(this.pagination.state, (add) ? ++this.pagination.page : this.pagination.page);
  }

  loadMovies(state, page) {
    if (!this.pagination.no_pages_left) {
      this.moviesService.getMovies(state, page)
        .then(response => {
          this.pagination.loading = false;
          this.pagination.total_pages = response.total_pages;
          if (this.movies === undefined) {
            this.movies = response.results;
          } else {
            response.results.forEach(movie => {
              this.movies.push(movie);
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
