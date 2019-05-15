import { Component, OnInit, Input } from '@angular/core';

import { DataLimit } from '../../../_interfaces/index';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {
  @Input() data: object[];
  @Input() type: string;
  @Input() media: string;
  list = new DataLimit();
  constructor() { }

  ngOnInit() {
    this.list.title = `${this.type === 'cast' ? 'Reparto' : 'Producción'} ${this.media === 'video' ? 'en...' : ''}`;
    this.data.forEach((item, index) => {
      const name = (item['title']) ? item['title'] : item['name'];
      item['name'] = name;

      const path = (item['poster_path']) ? item['poster_path'] : item['profile_path'];
      item['image'] = path ? `https://image.tmdb.org/t/p/w185${path}` : `https://placehold.it/185x278?text=${name}`;

      const partial = (item['gender']) ? 'celebritie' : (item['media_type'] === 'movie') ? item['media_type'] : 'tvshow';
      item['route'] = `/${partial}/${item['id']}/`;
    });
    this.loadMore();
  }

  loadMore() {
    this.list.limit += this.list.increment;
    if (this.list.limit >= this.data.length) {
      this.list.hide_button = true;
    }
  }

}
