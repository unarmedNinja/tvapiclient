import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowService } from './services/show.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ShowService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
