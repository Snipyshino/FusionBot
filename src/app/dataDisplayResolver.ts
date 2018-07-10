// import {FusionbotService} from 'fusionbot.service';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {FusionbotService} from './fusionbot.service';

@Injectable()
export class GraphResolver implements Resolve<Response> {
    constructor(private graphService: FusionbotService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> | Observable<any> {
        return this.graphService.getData();
    }
}