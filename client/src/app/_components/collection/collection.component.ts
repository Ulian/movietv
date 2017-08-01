import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CollectionsService } from '../../_services/index';


@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  collection: object;

  constructor(
    private collectionService: CollectionsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.collectionService.getCollection(+params['id'])
          .then(response => {
            this.collection = response;
          });
      });
  }
}
