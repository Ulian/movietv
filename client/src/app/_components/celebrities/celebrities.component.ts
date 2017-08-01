import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CelebritiesService } from '../../_services/index';

@Component({
  selector: 'app-celebrities',
  templateUrl: './celebrities.component.html',
  styleUrls: ['./celebrities.component.css']
})
export class CelebritiesComponent implements OnInit {
  celebrities: string[];
  page: number;
  total_pages: number;
  no_more_pages = false;
  celebrities_loading = true;
  constructor(
    private celebritiesService: CelebritiesService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.page = +params['page'];
        this.moreCelebrities(false);
      });
  }

  moreCelebrities(add) {
    this.celebrities_loading = true;
    this.loadCelebrities((add) ? ++this.page : this.page);
  }

  loadCelebrities(page) {
    if (!this.no_more_pages) {
      this.celebritiesService.getCelebrities(this.page)
        .then(response => {
          this.celebrities_loading = false;
          this.total_pages = response.total_pages;
          if (this.celebrities === undefined) {
            this.celebrities = response.results;
          } else {
            response.results.forEach(celebritie => {
              this.celebrities.push(celebritie);
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
