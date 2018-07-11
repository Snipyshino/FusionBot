import {Component, OnInit} from '@angular/core';
import {FusionbotService} from '../../fusionbot.service';

@Component({
    selector: 'app-data-display',
    templateUrl: './data-display.component.html',
    styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

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
                width: 1000,
                margin: 50,
            },
            navigator: {
                enable: true,
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
                noData: 'Nichts zu anzeigen'
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#DD3333'
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
                zIndex: 3,
                data: [],
                showInNavigator: true,
                color: '#fff35d'
            }, {
                name: 'AI Prediction',
                data: [],
                type: 'line',
                zIndex: 2,

                    color: '#6300ff'

            }, {
                name: 'AI Error Margin',
                data: [],
                zIndex: 1,
                type: 'arearange',

                    color: '#a47cff'

            }, {
                name: 'Anomaly',
                zIndex: 4,
                data: [],
                showInNavigator: true,
                onSeries: 'cpuUsage',
                type: 'scatter',
                color: '#DD3333',
                marker: {
                    enabledThreshold: 5
                },
                id: 'anomaly',
            }]
        };
    }

    public options: any;
    public loaded = false;

    ngOnInit() {
        this.fusionbot.getData().subscribe((data) => {
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
                console.log(emaGraphData);

                this.options.series[0].data = graphData;
                this.options.series[1].data = emaGraphData;
                this.options.series[2].data = emsRanges;
                this.options.series[3].data = anomalies;
                console.log(this.options);

                setTimeout(() => {
                    this.loaded = true;
                }, 5000);
            }
        );
    }
}
