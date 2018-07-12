import {Component, OnInit} from '@angular/core';
import {FusionbotService} from '../../core/services/fusionbot.service';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {$} from 'protractor';
import {Options} from 'highcharts/highstock';

@Component({
    selector: 'app-data-display',
    templateUrl: './data-display.component.html',
    styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
    private socket: any;
    private chart: any;

    /*
     *  Holds the options for the graph
     */
    constructor(private fusionbot: FusionbotService) {
        this.options = {
            chart: {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#2f2e4c'],
                        [1, 'rgb(28,32,41)']
                    ]
                },
                width: 1920,
                height: 800,
            },
            navigator: {
                enabled: true,
                handles: {
                    backgroundColor: '#a47cff',
                    borderColor: '#6300ff'
                },
                maskFill: 'rgba(38,32,51, 0.50)'
            },
            rangeSelector: {
                enabled: true,
            },
            title: {
                text: 'CPU Utilization',
                style: {
                    color: '#FFF',
                    fontWeight: 'bold'
                }
            },
            yAxis: {
                min: 0.0,
                max: 100,
                opposite: false,
                zIndex: 1,
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
                    },

                },
                labels: {
                    style: {
                        color: '#CCC',
                    }
                }
            },
            lang: {
                noData: 'No data to show'
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#DD3333',
                    zIndex: 10
                }
            },
            legend: {
                enabled: true,
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
                // valueDecimals: 1,
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    boostThreshold: 2000,
                }
            },
            series: [{
                name: 'CPU Utilization',
                id: 'cpuUsage',
                pointStart: Date.now(),
                pointInterval: 3600000,
                zIndex: 4,
                data: [],
                showInNavigator: true,
                color: '#fff35d',
                marker: {
                //    enabledThreshold: 5,
                    color: '#fff35d',
                    shape: 'circle'
                }
            }, {
                name: 'AI Prediction',
                data: [],
                pointStart: Date.now(),
                pointInterval: 3600000,
                type: 'line',
                zIndex: 3,
                visible: false,
                color: '#6300ff'

            }, {
                name: 'AI Error Margin',
                data: [],
                pointStart: Date.now(),
                pointInterval: 3600000,
                visible: false,
                zIndex: 2,
                type: 'arearange',
                lineWidth: 0,
                color: '#a47cff'

            }
                , {
                    name: 'Anomaly',
                    visible: false,
                    zIndex: 5,
                    data: [],
                    showInNavigator: true,
                    onSeries: 'cpuUsage',
                    pointStart: Date.now(),
                    pointInterval: 3600000,
                    type: 'flags',
                    allowOverlapX: true,
                    cropThreshold: 10,
                    shape: 'circlepin',
                    dataLabels: {},
                    labels: {},
                    color: '#DD3333',
                    marker: {
                        symbol: 'circle',
                        enabled: null,
                        enabledThreshold: 100,
                    },
                    id: 'anomaly',
                }
            ]
        };
    }

    public options: any;

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }

    ngOnInit() {
        this.socket = io(environment.socketUrl);
        this.socket.on('connect', () => {
            console.log('connected');
        });
        this.socket.on('data', (data) => {
                // const graphData = data.data.map((d) => {
                //     return parseFloat(d);
                // });
                // const emaGraphData = data.ema.map((d) => {
                //     return parseFloat(d);
                // });
                // const emsRanges = data.allEMS.map((d) => {
                //     return d;
                // });
                // const anomalies = data.anomalies.map((d) => {
                //     return d;
                // });
                console.log(data);
                console.log(this.options.series);

                this.chart.series[0].addPoint(parseFloat(data.data));
                this.chart.series[1].addPoint(parseFloat(data.ema));
                this.chart.series[2].addPoint(data.allEms);
                this.chart.series[3].addPoint(data.anomalies);
                this.chart.reflow();
            }
        );
    }
}
