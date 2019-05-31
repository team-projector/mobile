import { Component } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { AppConfig } from '~/app-config';
import { MeManager } from '~/app/managers/me.manager';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private config: AppConfig,
                public me: MeManager) {
    }

    logout(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
        this.config.authorization = null;
    }
}
