import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ShowsService} from '../../_services/index';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
  season: object[];

  constructor(
    private showsService: ShowsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        console.log(+params['number'].split('-').pop());
        this.showsService.getSeason(+params['id'], +params['number'].split('-').pop())
          .then(response => {
            console.log(response);
            this.season = response;
          });
      });
  }

}
