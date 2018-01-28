import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Episode } from "../models/episode";
import { MessageService } from './message.service';

@Injectable()
export class EpisodeService {

  private showsDomain = "http://cloudvps:8888/tvapp/tv";
  //private showsDomain = 'http://localhost:8080/tvapp/tv/';  // URL to web api
  private showsUrl = this.showsDomain + '/shows';  // URL to web api
  private addShowUrl = this.showsDomain + "/show/add";
  private tokenUrl = this.showsDomain + "/token";
  
  private episodesUrl = this.showsDomain + "/shows/recent";
  

  private token : String = null;;

  constructor( private http: HttpClient, private messageService: MessageService) { }

  getEpisodesTest() : Observable<Episode[]> {
    let e = new Episode();
    e.id = 1;
    e.showid = 1;
    e.episodeName = "Test 1";
    let episodes : Episode[];
    episodes.push(e);
  
    this.messageService.add('ShowService: fetched shows');
    return of(episodes);
  }
  
  getShows() : Observable<Episode[]> {
  
    this.messageService.add('ShowService: fetched shows');

    return this.http.get<Episode[]>(this.showsUrl)
    .pipe(
      tap(shows => this.log(`fetched shows`)),
      catchError(this.handleError<Episode[]>('getShows', []))
    );

  }

  getToken(): String {
    if(!this.token){
      this.http.get<String>(this.tokenUrl).pipe(
        tap(t => this.token = t)
      )
    }
    return this.token;
  }

  getRecentEpisodes() : Observable<Episode[]> {
    this.messageService.add('EpisodeService: fetched recent episodes');

    return this.http.get<Episode[]>(this.episodesUrl)
    .pipe(
      tap(shows => this.log(`pipe fetched episdoes`)),
      catchError(this.handleError<Episode[]>('getRecentEpisodes', []))
    );
  }

  private log(message: string) {
    this.messageService.add('ShowService: ' + message);
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
