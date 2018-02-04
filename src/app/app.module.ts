import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { 
  MatToolbarModule, 
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowService } from './services/show.service';
import { EpisodeService } from './services/episode.service';

import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './/app-routing.module';
import { EpisodesComponent } from './episodes/episodes.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    MessagesComponent,
    EpisodesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [ShowService, MessageService, EpisodeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
