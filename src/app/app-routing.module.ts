import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from "./shows/shows.component";
import { EpisodesComponent } from "./episodes/episodes.component";
import { EpisodeComponent } from "./episode/episode.component";

const routes: Routes = [
  { path: 'shows', component: ShowsComponent },
  { path: 'recent', component: EpisodesComponent },
  { path: 'episode/:showId', component: EpisodeComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { 


}

