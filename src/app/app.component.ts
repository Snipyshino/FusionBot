import {Component} from '@angular/core';
import {Router} from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router) {}
        title = 'app';
        toolbarMenuLeft = [
            {
                icon: 'icon-line-graph',
                click: () => {
                    this.router.navigate(['ema-graph']);
                },
                tooltip: 'EMA Line Graph',
                active: false
            }
            // {
            //     icon: 'icon-alert',
            //     click: () => {}
            // }
        ];
}
