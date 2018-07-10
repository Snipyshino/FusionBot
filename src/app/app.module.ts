import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {DataDisplayComponent} from './graph-area/data-display/data-display.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {NgxUIModule} from '@intergral/kaleidoscope';
import { ChartModule } from 'angular2-highcharts';
import {HttpClientModule} from '@angular/common/http';

declare var require: any;
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
        RouterModule.forRoot( [
            {
                path: 'ema-graph',
                component: DataDisplayComponent,
            }
        ])
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {
}
