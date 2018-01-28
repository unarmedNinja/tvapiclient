import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Show } from "../models/show";
import { MessageService } from './message.service';

@Injectable()
export class ShowService {

  private showsDomain = "http://cloudvps:8888/tvapp/tv";
  //private showsDomain = 'http://localhost:8080/tvapp/tv/';  // URL to web api
  private showsUrl = this.showsDomain + '/shows';  // URL to web api
  private addShowUrl = this.showsDomain + "/show/add";
  private tokenUrl = this.showsDomain + "/token";
  

  private token : String = null;;

  constructor( private http: HttpClient, private messageService: MessageService) { }

  getShowsTest() : Observable<Show[]> {
    let shows : Show[] = [
      { id : 1, name : "Arrow"},
      { id : 2, name : "Gotham"}
    ]
  
    this.messageService.add('ShowService: fetched shows');
    return of(shows);
  }
  
  getShows() : Observable<Show[]> {
  
    this.messageService.add('ShowService: fetched shows');

    return this.http.get<Show[]>(this.showsUrl)
    .pipe(
      tap(shows => this.log(`fetched shows`)),
      catchError(this.handleError<Show[]>('getShows', []))
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

  /** POST: add a new hero to the server */
  addShow (show: Show): Observable<Show> {
  return this.http.post<Show>(this.addShowUrl, show).pipe(
    tap((show: Show) => this.log(`added show w/ id=${show.id}`)),
    catchError(this.handleError<Show>('addShow'))
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
