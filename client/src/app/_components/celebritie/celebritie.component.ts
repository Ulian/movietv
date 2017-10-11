import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Modal } from 'angular2-modal/plugins/bootstrap';

import { CelebritiesService } from '../../_services/index';

@Component({
  selector: 'app-celebritie',
  templateUrl: './celebritie.component.html',
  styleUrls: ['./celebritie.component.css']
})
export class CelebritieComponent implements OnInit {
  celebritie: object;
  hide_images_button = false;
  images_page = 0;
  images_total_pages: number;
  celebritie_images_loading = false;

  constructor(
    private celebritiesService: CelebritiesService,
    private route: ActivatedRoute,
    public modal: Modal) {
    }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.celebritiesService.getCelebritie(+params['id'])
          .then(response => {
            this.celebritie = response;
            this.loadMore();
          });
      });
  }

  loadMore() {
    this.celebritie_images_loading = true;
    if (!this.hide_images_button) {
      if (this.images_page >= this.images_total_pages) {
        this.hide_images_button = true;
        return;
      }
      this.celebritiesService.getCelebritieImages(this.celebritie['id'], ++this.images_page)
        .then(response => {
          this.celebritie_images_loading = false;
          response.results.forEach(image => {
            this.celebritie['tagged_images']['results'].push(image);
            this.images_total_pages = response.total_pages;
            if (this.images_page >= this.images_total_pages) {
              this.hide_images_button = true;
              return;
            }
          });
        })
        .catch(error => this.celebritie_images_loading = false);
    } else {
      this.hide_images_button = true;
    }
  }

  openModal(image) {
    this.modal.alert()
      .size('lg')
      .title(`Imagen de ${this.celebritie['name']}`)
      .body(`<img class="img-responsive" src="${image}">`)
      .open();
  }
}
