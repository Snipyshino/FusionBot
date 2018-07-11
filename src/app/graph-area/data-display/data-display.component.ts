import {Component, OnInit} from '@angular/core';
import {FusionbotService} from '../../fusionbot.service';
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
                margin: 50,
            },
            navigator: {
                enabled: false,
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
                valueSuffix: '%'
            },
            plotOptions: {
                series: {
                    turboThreshold: 3000
                }
            },
            series: [{
                name: 'CPU Utilization',
                id: 'cpuUsage',
                zIndex: 4,
                data: [],
               // showInNavigator: true,
                color: '#fff35d'
            }, {
                name: 'AI Prediction',
                data: [],
                type: 'line',
                zIndex: 3,

                color: '#6300ff'

            }, {
                name: 'AI Error Margin',
                data: [],
                zIndex: 2,
                type: 'arearange',

                color: '#a47cff'

            }, {
                name: 'Anomaly',
                zIndex: 5,
                data: [],
              //  showInNavigator: true,
                onSeries: 'cpuUsage',
                type: 'scatter',
                color: '#DD3333',
                marker: {
                    enabledThreshold: 6
                },
                id: 'anomaly',
            }]
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
                const graphData = data.data.map((d) => {
                    return parseFloat(d);
                });
                const emaGraphData = data.ema.map((d) => {
                    return parseFloat(d);
                });
                const emsRanges = data.allEMS.map((d) => {
                    return d;
                });
                const anomalies = data.anomalies.map((d) => {
                    return d;
                });
                console.log(data);
            console.log(this.options.series);

                this.chart.series[0].push(graphData, true);
                this.chart.series[1].push(emaGraphData, true);
                this.chart.series[2].push(emsRanges, true);
                this.chart.series[3].push(anomalies, true);
                this.chart.redraw();
            }
        );
    }
}
