import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent,
         MovieComponent,
         TvShowsComponent,
         TvShowComponent,
         SeasonComponent,
         CelebritiesComponent,
         CelebritieComponent,
         SearchComponent,
         CollectionComponent } from '../../_components/index';

const appRoutes: Routes = [
  { path: 'movies/:state/:page', component: MoviesComponent },
  { path: 'movies/:state', redirectTo: 'movies/:state/1', pathMatch: 'full' },
  { path: 'movies', redirectTo: 'movies/popular/1', pathMatch: 'full' },

  { path: 'movie/:id', component: MovieComponent },
  { path: 'movie/:id/:slug', component: MovieComponent },

  { path: 'tvshows/:state/:page', component: TvShowsComponent },
  { path: 'tvshows/:state', redirectTo: 'tvshows/:state/1', pathMatch: 'full' },
  { path: 'tvshows', redirectTo: 'tvshows/popular/1', pathMatch: 'full' },

  { path: 'tvshow/:id', component: TvShowComponent },
  { path: 'tvshow/:id/:slug', component: TvShowComponent },

  { path: 'season/:id/:number', component: SeasonComponent },

  { path: 'celebrities/:page', component: CelebritiesComponent },
  { path: 'celebrities', redirectTo: 'celebrities/1', pathMatch: 'full' },

  { path: 'celebritie/:id', component: CelebritieComponent },
  { path: 'celebritie/:id/:slug', component: CelebritieComponent },

  { path: 'collection/:id', component: CollectionComponent},
  { path: 'collection/:id/:slug', component: CollectionComponent},

  { path: 'search/:query', component: SearchComponent },

  { path: '', redirectTo: 'movies/popular/1', pathMatch: 'full' },
  { path: '**', redirectTo: 'movies/popular/1', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  declarations: []
})
export class RoutingModule { }
