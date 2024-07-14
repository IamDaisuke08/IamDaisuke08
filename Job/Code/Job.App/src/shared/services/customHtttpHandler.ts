import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CustomHttpHandlers {
    api_env : string = '';
    constructor() { }

    public setEnv(env : string)
    {
        this.api_env = env;
    }

    public handleError(error : HttpErrorResponse) {
        let errMessage = `ERROR for Env ${ this.api_env }`;
        console.log(errMessage, error.error);
        return throwError(() => new Error('An error occured while connecting to the server. Please try again.', error.error));
    }
}