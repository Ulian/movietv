import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CelebritiesService } from '../../_services/index';

import { Pagination } from '../../_interfaces/index';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {
  celebrities: string[];
  pagination = new Pagination();

  constructor(
    private celebritiesService: CelebritiesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.pagination.page = +params['page'];
        this.moreCelebrities(false);
      });
  }

  moreCelebrities(add) {
    this.pagination.loading = true;
    this.loadCelebrities((add) ? ++this.pagination.page : this.pagination.page);
  }

  loadCelebrities(page) {
    if (!this.pagination.no_pages_left) {
      this.celebritiesService.getCelebrities(this.pagination.page)
        .then(response => {
          this.pagination.loading = false;
          this.pagination.total_pages = response.total_pages;
          if (this.celebrities === undefined) {
            this.celebrities = response.results;
          } else {
            response.results.forEach(celebritie => {
              this.celebrities.push(celebritie);
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
