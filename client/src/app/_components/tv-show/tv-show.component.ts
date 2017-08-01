import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShowsService } from '../../_services/index';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent implements OnInit {
  show: string[];
  createdBy_limit = 0;
  hide_createdBy_button = false;
  crew_limit = 0;
  hide_crew_button = false;
  cast_limit = 0;
  hide_cast_button = false;
  season_limit = 0;
  hide_season_button = false;
  limit_increment = 5;
  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.showsService.getShow(+params['id'])
          .then(response => {
            this.show = response;
            this.loadMore('createdBy');
            this.loadMore('crew');
            this.loadMore('cast');
            this.loadMore('season');
          });
      });
  }

  loadMore(type) {
    if (type === 'createdBy') {
      this.createdBy_limit += this.limit_increment;
      if (this.createdBy_limit >= this.show['created_by'].length) {
        this.hide_createdBy_button = true;
      }
    } else if (type === 'crew') {
      this.crew_limit += this.limit_increment;
      if (this.crew_limit >= this.show['credits']['crew'].length) {
        this.hide_crew_button = true;
      }
    } else if (type === 'cast') {
      this.cast_limit += this.limit_increment;
      if (this.cast_limit >= this.show['credits']['cast'].length) {
        this.hide_cast_button = true;
      }
    } else if (type === 'season') {
      this.season_limit += this.limit_increment;
      if (this.season_limit >= this.show['seasons'].length) {
        this.hide_season_button = true;
      }
    }
  }

}
