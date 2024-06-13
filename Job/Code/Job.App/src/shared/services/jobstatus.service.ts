import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs';
import { CustomHttpHandlers } from './customHtttpHandler';

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
}
