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
    this.loadMore();
  }

  loadMore() {
    this.list.limit += this.list.increment;
    if (this.list.limit >= this.data.length) {
      this.list.hide_button = true;
    }
  }

}
