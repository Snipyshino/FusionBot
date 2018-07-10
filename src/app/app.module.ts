import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {DataDisplayComponent} from './graph-area/data-display/data-display.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgxUIModule} from '@intergral/kaleidoscope';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {ChartModule} from 'angular2-highcharts';
import * as highcharts from 'highcharts';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {HttpClient, HttpClientModule} from '@angular/common/http';

declare var require: any;
// import * as highChartsMore from 'highcharts/highcharts-more';

@NgModule({
    declarations: [
        AppComponent,
        DataDisplayComponent
    ],
    imports: [
        BrowserModule,
        ChartModule.forRoot(require('highcharts')),
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule,
        NgxUIModule,
        NgxChartsModule,
        RouterModule.forRoot( [
            {
                path: 'ema-graph',
                component: DataDisplayComponent,
            }
        ])
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

export function highchartsFactory() {
   // highChartsMore(highcharts);
    return highcharts;
}
