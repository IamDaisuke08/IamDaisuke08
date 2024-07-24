import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthorisationService {

    readonly path = 'User'
    readonly baseUrl : string = `${ environment.API_URL }api/`; //"http://localhost:5202/api/";

    constructor(private client : HttpClient) { }

    private getStandarOptions() : any {
        return {
          headers : new HttpHeaders({
            'Access-Control-Allow-Origin': environment.API_URL,
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type': 'application/json',
            
          })
        };
      }

    LogIn(username: string, password: string) {
        let options = this.getStandarOptions();
        return this.client.post(`${ this.baseUrl + this.path }/Login`,
            `{
                "username": "${ username }",
                "password": "${ password }"
            }`, options);
    }
}
