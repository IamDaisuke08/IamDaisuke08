import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { CustomHttpHandlers } from './customHtttpHandler';
import { JobStatusItem } from '../models/jobStatusItem';

@Injectable({
  providedIn: 'root'
})
export class JobstatusService extends CustomHttpHandlers {
  
  private baseUrl : string = "http://localhost:5202/api/JobStatus"

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

  getStatus() {
    let options = this.getStandarOptions();
    return this.client.get(this.baseUrl, options).pipe(catchError(this.handleError));
  }

  updateStatus(status : JobStatusItem) {
    let options = this.getStandarOptions();
    return this.client.put(this.baseUrl + "/" + status.id, status, options).pipe(catchError(this.handleError));
  }

  addStatus(status : JobStatusItem) {
    let options = this.getStandarOptions();
    return this.client.post(this.baseUrl, status, options).pipe(catchError(this.handleError));
  }

  deleteStatus(statusId : number) {
    let options = this.getStandarOptions();
    return this.client.delete(`${this.baseUrl}/${statusId}`, options).pipe(catchError(this.handleError));
  }
}
