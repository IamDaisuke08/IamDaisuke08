import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CustomHttpHandlers {

    public handleError(error : HttpErrorResponse) {
        console.log('ERROR: ', error.error);
        return throwError(() => new Error('An error occured while connecting to the server. Please try again.', error.error));
    }
}