import { Injectable } from '@angular/core';
import { CustomHttpHandlers } from './customHtttpHandler';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { GenericItem } from '../models/genericItem';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService<T extends GenericItem> extends CustomHttpHandlers {

  private baseUrl : string = "http://localhost:5202/api/";

  Path : string = '';

  constructor(private client : HttpClient) 
  { 
    super();
  }

  private getStandarOptions() : any {
    return {
      headers : new HttpHeaders({
        'Access-Control-Allow-Origin': 'http://localhost:5202/',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      })
    };
  }

  private getCompletePath() : string {
    return this.baseUrl + this.Path;
  }

  get() {
    let options = this.getStandarOptions();
    return this.client.get(this.getCompletePath(), options).pipe(catchError(this.handleError));
  }

  update(item : T) {
    let options = this.getStandarOptions();
    return this.client.put(this.getCompletePath() + "/" + item.id, item, options).pipe(catchError(this.handleError));
  }

  add(item : T) {
    let options = this.getStandarOptions();
    return this.client.post(this.getCompletePath(), item, options).pipe(catchError(this.handleError));
  }

  delete(id : number) {
    let options = this.getStandarOptions();
    return this.client.delete(`${this.getCompletePath()}/${id}`, options).pipe(catchError(this.handleError));
  }
}
