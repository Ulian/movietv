import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { MoviesService } from '../../_services/index';

import { DataLimit } from '../../_interfaces/index';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: object;
  images = new DataLimit();
  videos = new DataLimit(2, false, 2);

  constructor(
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private modal: Modal,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.moviesService.getMovie(+params['id'])
          .then(response => {
            response['videos']['results'].forEach((video, index) => {
              response['videos']['results'][index]['url'] = this.sanitizeUrl(`https://www.youtube.com/embed/${video.key}`);
            });
            this.movie = response;
            this.loadMore('images');
            this.loadMore('videos');
          });
      });
  }

  loadMore(type) {
    switch (type) {
      case 'images':
      case 'videos':
        const loadType = (type !== 'images' && type !== 'videos') ? 'credits' : type;
        const loadType2 = (type !== 'images' && type !== 'videos') ? type : (type === 'images') ? 'backdrops' : 'results';

        this[type].limit += this[type].increment;
        if (this[type].limit >= this.movie[loadType][loadType2].length) {
          this[type].hide_button = true;
        }
        break;
    }
  }

  openModal(image, isImage) {
    if (isImage) {
      this.modal.alert()
        .size('lg')
        .title(`Imagen de ${this.movie['title']}`)
        .body(`<img class="img-responsive" src="${image}">`)
        .open();
    }
  }

  sanitizeUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
