import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/switchMap';

import { Episode } from "../models/episode";
import { Token } from '../models/token';

import { MessageService } from './message.service';
import { TokenService } from './token.service';

import mockEpisodes from '../mocks/episodes';
import * as _ from 'lodash';

@Injectable()
export class EpisodeService {

  private showsUrl = environment.api_url+ '/shows';  // URL to web api
  private addShowUrl = environment.api_url + "/show/add";
  
  
  private episodesUrl = environment.api_url + "/shows/recent";
  private addEpisodesUrl = environment.api_url + "/getEpisodes/";
  private deleteEpisodesUrl = environment.api_url + "/shows/delete/";
  private episodeUrl = environment.api_url + "/episodes/";

  constructor( 
    private http: HttpClient, 
    private messageService: MessageService, 
    private tokenService: TokenService
  ) { }

  getEpisodesTest() : Observable<Episode[]> {
    let e = new Episode();
    e.id = 1;
    e.showid = 1;
    e.episodeName = "Test 1";
    let episodes : Episode[];
    episodes.push(e);
    var eps = mockEpisodes;
    _.forEach(eps, function(e){
      e.firstAiredDate = new Date(e.firstAiredDate);
    });

    this.messageService.add('ShowService: fetched shows');
    return of(eps);
  }
  
  getShows() : Observable<Episode[]> {
  
    this.messageService.add('ShowService: fetched shows');

    return this.http.get<Episode[]>(this.showsUrl)
    .pipe(
      tap(shows => this.log(`fetched shows`)),
      catchError(this.handleError<Episode[]>('getShows', []))
    );

  }

  
  getRecentEpisodes() : Observable<Episode[]> {
    this.messageService.add('EpisodeService: fetched recent episodes');

    return this.http.get<Episode[]>(this.episodesUrl)
    .pipe(
      tap(shows => this.log('pipe fetched episdoes:' + JSON.stringify(shows))),
      catchError(this.handleError<Episode[]>('getRecentEpisodes', []))
    );
  }

  getEpisodesByShowId(showId: number) : Observable<Episode[]> {    
    return this.http.get<Episode[]>(this.episodeUrl + showId)
    .pipe(
      tap(shows => this.log('pipe fetched episdoes:' + JSON.stringify(shows))),
      catchError(this.handleError<Episode[]>('getRecentEpisodes', []))
    );
  }


  getRequestOptions(token : Token) :HttpHeaders {
    let headers : HttpHeaders = new HttpHeaders(
      {
        "TVDBTOKEN" : token.token
      }
    );

    return headers;
  }

  addEpisodes (showId: number, page : number): Observable<Episode[]> {
    return this.tokenService.getToken()
      .switchMap(token => this.http.get<Episode[]>(this.addEpisodesUrl + showId + "?page=" + page, {headers: this.getRequestOptions(token)})
        .pipe(
          tap((data) => this.log(`retrieved episodes w/ id=${data}`)),
          catchError(this.handleError<Episode[]>('addEpisodes'))
        )
      );
/*
      return this.http.get<Episode[]>(this.addEpisodesUrl + showId).pipe(
        tap((data) => this.log(`retrieved episodes w/ id=${data}`)),
        catchError(this.handleError<Episode[]>('addEpisodes'))
      );
      */
    }

    deleteEpisodes(showId: number) : Observable<number> {
      return this.http.delete<number>(this.deleteEpisodesUrl + showId, {});
    }

  private log(message: string) {
   // this.messageService.add('ShowService: ' + message);
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
