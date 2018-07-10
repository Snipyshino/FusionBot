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
                cpuGraph = Highcharts.chart('cpuGraph', {
                    colors: ['#a47cff',
                        '#6300ff',
                        '#ffffff'
                    ],
                    chart: {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#2f2e4c'],
                                [1, 'rgb(28,32,41)']
                            ]
                        }
                    },
                    title: {
                        text: 'CPU Temperature',
                        style: {
                            color: '#FFF',
                            fontWeight: 'bold'
                        }
                    },
                    yAxis: {
                        min: 0.0,
                        max: 100,
                        title: {
                            text: 'Usage Percentage',
                            style: {
                                color: '#CCC',
                            }
                        },
                        labels: {
                            style: {
                                color: '#CCC'
                            }
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Tick',
                            style: {
                                color: '#CCC',
                            }
                        },
                        labels: {
                            style: {
                                color: '#CCC',
                            }
                        }
                    },
                    legend: {
                        itemStyle: {
                            color: '#CCC'
                        },
                        itemHoverStyle: {
                            color: '#892dff'
                        },
                        itemHiddenStyle: {
                            color: '#555'
                        }
                    },
                    labels: {
                        style: {
                            color: '#CCC',
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true,
                        valueSuffix: '%'
                    },
                    series: [{
                        name: 'AI Error Margin',
                        data: emsRanges,
                        type: 'arearange'

                    }, {
                        name: 'AI Prediction',
                        data: emaGraphData
                    }, {
                        name: 'CPU Utilization',
                        data: graphData,
                    }]
                });

                this.loaded = true;
            }
        );
    }
}
