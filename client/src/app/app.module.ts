import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { NgPipesModule } from 'ngx-pipes';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { MomentModule } from 'angular2-moment';

import { AppComponent,
         MoviesComponent,
         MovieComponent,
         TvShowsComponent,
         TvShowComponent,
         SeasonComponent,
         CelebritiesComponent,
         CelebritieComponent,
         SearchComponent,
         SearchNavComponent,
         CollectionComponent } from './_components/index';

import { RoutingModule } from './_modules/index';

import { CelebritiesService,
         MoviesService,
         ShowsService,
         CollectionsService,
         SearchService } from './_services/index';

import { ImageHoverDirective } from './_directives/index';

import { AppConfig } from './app.config';

@NgModule({
  declarations: [
    ImageHoverDirective,
    AppComponent,
    MoviesComponent,
    MovieComponent,
    TvShowsComponent,
    TvShowComponent,
    SeasonComponent,
    CelebritiesComponent,
    CelebritieComponent,
    SearchComponent,
    SearchNavComponent,
    CollectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    RoutingModule,
    NgPipesModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    MomentModule
  ],
  providers: [
    AppConfig,
    CelebritiesService,
    MoviesService,
    ShowsService,
    CollectionsService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
