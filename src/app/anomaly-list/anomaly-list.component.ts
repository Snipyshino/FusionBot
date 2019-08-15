import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-anomaly-list',
    templateUrl: './anomaly-list.component.html',
    styleUrls: ['./anomaly-list.component.css']
})
export class AnomalyListComponent implements OnInit {
    private socket: any;
    private chart: any;

    constructor() {
    }

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }

    ngOnInit() {
        // TODO finish this
        // this.socket = io(environment.socketUrl);
        // this.socket.on('connect', () => {
        //     console.log('connected');
        //     this.loaded = true;
        // });
    }

}
