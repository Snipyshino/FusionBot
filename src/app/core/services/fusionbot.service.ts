import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FusionbotService {

    constructor(private http: HttpClient) {
    }

    getData(): Observable<any> {

        console.log('test', environment.socketUrl);

        return this.http.get(environment.restUrl)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}
