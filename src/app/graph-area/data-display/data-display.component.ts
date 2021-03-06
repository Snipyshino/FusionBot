import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';

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
    constructor() {
        this.options = {
            chart: {
                backgroundColor: {
                    linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, '#2f2e4c'],
                        [1, 'rgb(28,32,41)']
                    ]
                },
                width: 1800,
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
                enabled: false,
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
            credits: {
                enabled: false
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '40px',
                    color: '#DD3333',
                    zIndex: 10
                },
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
            boost: {
                allowForce: true,
                seriesThreshold: 1500,
                useGPUTranslations: true
            },
            series: [{
                name: 'CPU Utilization',
                id: 'cpuUsage',
                pointStart: Date.now(),
                color: '#fff35b',
                pointInterval: 3600000,
                zIndex: 4,
                data: [],
                showInNavigator: true,
                // color: "#f73aff",
                marker: {
                    enabledThreshold: 5,
                    shape: 'circle',
                    radius: 4,
                }
            }, {
                name: 'AI Prediction',
                data: [],
                pointStart: Date.now(),
                pointInterval: 3600000,
                type: 'line',
                zIndex: 3,
                visible: true,
                color: '#6300ff'

            }, {
                name: 'AI Error Margin',
                data: [],
                visible: true,
                pointStart: Date.now(),
                zIndex: 2,
                type: 'arearange',
                lineWidth: 0,
                color: '#a47cff'

            }
                /* Depreciated */
                // , {
                //     name: 'Anomaly',
                //     visible: true,
                //     zIndex: 5,
                //     data: [],
                //     showInNavigator: true,
                //     onSeries: 'cpuUsage',
                //     pointStart: Date.now(),
                //     pointInterval: 3600000,
                //     type: 'flags',
                //     allowOverlapX: true,
                //     cropThreshold: 10,
                //     shape: 'circlepin',
                //     dataLabels: {},
                //     labels: {},
                //     color: '#DD3333',
                //     marker: {
                //         symbol: 'circle',
                //         enabled: null,
                //         enabledThreshold: 100,
                //     },
                //     id: 'anomaly',
                // }
            ]
        };
    }

    public options: any;

    saveInstance(chartInstance: any): void {
        this.chart = chartInstance;
    }

    extractData(seriesNum: number, dataName: any) {
        this.chart.series[seriesNum].addPoint(dataName, true);
    }

    getAnomalyColor(data: boolean): String {
        if (data) {
            return '#DD3333';
        } else {
            return '#fff35d';
        }
    }

    ngOnInit() {
        this.socket = io(environment.socketUrl);
        this.socket.on('connect', () => {
            console.log('connected');
        });
        this.socket.on('data', (data) => {
                console.log(data);
                this.options.series[0].color = this.getAnomalyColor(data.anomaly);
                console.log(this.options.series.color);
                this.extractData(0, parseFloat(data.data));
                this.extractData(1, parseFloat(data.ema));
                try {
                    this.extractData(2, ([data.time, parseFloat(data.lems), parseFloat(data.hems)]));
                } catch (e) {
                    this.extractData(2, data.allEms);
                }
                this.chart.redraw();
            }
        );
    }
}
