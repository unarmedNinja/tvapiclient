import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from "./shows/shows.component";
import { EpisodesComponent } from "./episodes/episodes.component";

const routes: Routes = [
  { path: 'shows', component: ShowsComponent },
  { path: 'recent', component: EpisodesComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { 


}

