import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Token } from '../models/token';
import { MessageService } from './message.service';

@Injectable()
export class TokenService {

  private token : Token;
  private tokenUrl = environment.api_url + "/token";

  constructor(private http: HttpClient, private messageService: MessageService) { }

  public getToken(): Observable<Token> {
    if(!this.token){
      console.log("episode service getting token");
      
      return this.http.get<Token>(this.tokenUrl)
      .pipe(
        tap((t:Token)  => this.token = t),
        catchError(this.handleError<Token>('token failed'))
      );      
    }
    else{
      console.log("episode service using existing token");
      console.log("EPISODE TOKEN: ", this.token);
      return of(this.token);
    }
        
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
