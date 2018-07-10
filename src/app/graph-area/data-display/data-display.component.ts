import {Component, OnInit} from '@angular/core';
import {FusionbotService} from '../../fusionbot.service';
import * as Highcharts from 'highcharts';

declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
let cpuGraph;

@Component({
    selector: 'app-data-display',
    templateUrl: './data-display.component.html',
    styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

    constructor(private fusionbot: FusionbotService) {
    }

    public options: Object;
    public loaded = false;

    ngOnInit() {
        this.fusionbot.getData().subscribe((data) => {
            const graphData = data.data.map((d, k) => {
                return [k, d];
            });
            const emaGraphData = data.ema.map((d, k) => {
                return [k, parseFloat(d)];
            });
            const emsRanges = data.allEMS.map((d) => {
                return d;
            });
            console.log(emaGraphData);
           // document.addEventListener('DOMContentLoaded', function () {
                cpuGraph = Highcharts.chart('cpuGraph', {
                    title: {
                        text: 'CPU Data'
                    },
                    // data: {
                    //     enablePolling: true,
                    //     dataRefreshRate: 1
                    // },
                    series: [{
                        name: 'data',
                        data: graphData,
                    }, {
                        name: 'EMS Range',
                        data: emsRanges,
                        type: 'arearange'
                    }, {
                        name: 'EMA',
                        data: emaGraphData
                    }]
                });

                this.loaded = true;
            });
     //   });
    }
}
