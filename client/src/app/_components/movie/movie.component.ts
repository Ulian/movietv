import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { MoviesService } from '../../_services/index';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: object;
  cast_limit = 0;
  hide_cast_button = false;
  crew_limit = 0;
  hide_crew_button = false;
  images_limit = 0;
  hide_images_button = false;
  videos_limit = 0;
  hide_videos_button = false;
  limit_increment = 5;
  limit_increment_video = 2;

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
            this.loadMore('cast');
            this.loadMore('crew');
            this.loadMore('images');
            this.loadMore('videos');
          });
      });
  }

  loadMore(type) {
    if (type === 'cast') {
      this.cast_limit += this.limit_increment;
      if (this.cast_limit >= this.movie['credits']['cast'].length) {
        this.hide_cast_button = true;
      }
    } else if (type === 'crew') {
      this.crew_limit += this.limit_increment;
      if (this.crew_limit >= this.movie['credits']['crew'].length) {
        this.hide_crew_button = true;
      }
    } else if (type === 'images') {
      this.images_limit += this.limit_increment;
      if (this.images_limit >= this.movie['images']['backdrops'].length) {
        this.hide_images_button = true;
      }
    } else if (type === 'videos') {
      this.videos_limit += this.limit_increment_video;
      if (this.videos_limit >= this.movie['videos']['results'].length) {
        this.hide_videos_button = true;
      }
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
