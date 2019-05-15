import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-media-page',
  templateUrl: './media-page.component.html',
  styleUrls: ['./media-page.component.css']
})
export class MediaPageComponent implements OnInit {
  @Input() type: string;
  @Input() data: string;
  @Input() button: boolean;
  @Input() showMore: Function;
  constructor() { }

  ngOnInit() {
  }

}
