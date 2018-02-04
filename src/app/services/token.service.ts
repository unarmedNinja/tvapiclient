import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { Token } from '../models/token';

@Injectable()
export class TokenService {
  private showsDomain = "http://cloudvps:8888/tvapp/tv";

  constructor() { }

}
