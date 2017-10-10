import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShowsService } from '../../_services/index';

import { DataLimit } from '../../_interfaces/index';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  show: string[];
  created_by = new DataLimit();
  crew = new DataLimit();
  cast = new DataLimit();
  seasons = new DataLimit();

  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.showsService.getShow(+params['id'])
          .then(response => {
            this.show = response;
            this.loadMore('created_by');
            this.loadMore('crew');
            this.loadMore('cast');
            this.loadMore('seasons');
          });
      });
  }

  loadMore(type) {
    switch (type) {
      case 'crew':
      case 'cast':
      case 'created_by':
      case 'seasons':
        const limit = (type === 'crew' || type === 'cast') ? this.show['credits'][type] : this.show[type];
        this[type].limit += this[type].increment;
        if (this[type].limit >= limit.length) {
          this[type].hide_button = true;
        }
        break;
    }
  }
}
