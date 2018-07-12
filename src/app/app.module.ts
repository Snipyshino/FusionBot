import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {DataDisplayComponent} from './graph-area/data-display/data-display.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgxUIModule} from '@intergral/kaleidoscope';
import { ChartModule } from 'angular2-highcharts';
import {HttpClientModule} from '@angular/common/http';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {AnomalyListComponent} from './anomaly-list/anomaly-list.component';

export function highchartsFactory() {
    const hm = require('highcharts/highcharts-more');
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    const ndm = require('highcharts/modules/no-data-to-display');
    const bm = require('highcharts/modules/boost');
    dd(hc);
    bm(hc);
    ndm(hc);
    hm(hc);
    return hc;
}



declare var require: any;
@NgModule({
    declarations: [
        AppComponent,
        DataDisplayComponent,
        AnomalyListComponent,
    ],
    imports: [
        BrowserModule,
        ChartModule.forRoot(
            -       require('highcharts')
            +       require('highcharts/highcharts-more')
            +       require('highcharts/highstock')
        ),
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        NgxUIModule,
        RouterModule.forRoot( [
            {
                path: 'ema-graph',
                component: DataDisplayComponent,
            },
            {
                path: 'anomalies',
                component: AnomalyListComponent
            }
        ])
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
