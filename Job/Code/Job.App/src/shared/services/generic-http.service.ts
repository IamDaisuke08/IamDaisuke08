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

  private getCompletePath(path : string) : string {
    return this.baseUrl + path;
  }

  get(path : string) {
    let options = this.getStandarOptions();
    return this.client.get(this.getCompletePath(path), options).pipe(catchError(this.handleError));
  }

  getById(path : string, id : number) {
    let options = this.getStandarOptions();
    return this.client.get(this.getCompletePath(path) + "/" + id, options).pipe(catchError(this.handleError));
  }

  update(path : string, item : T) {
    let options = this.getStandarOptions();
    return this.client.put(this.getCompletePath(path) + "/" + item.id, item, options).pipe(catchError(this.handleError));
  }

  add(path : string, item : T) {
    let options = this.getStandarOptions();
    return this.client.post(this.getCompletePath(path), item, options).pipe(catchError(this.handleError));
  }

  delete(path : string, id : number) {
    let options = this.getStandarOptions();
    return this.client.delete(`${this.getCompletePath(path)}/${id}`, options).pipe(catchError(this.handleError));
  }
}
