import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { AppConfig } from '~/app-config';
import { MeManager } from '~/app/managers/me.manager';

@Component({
    selector: 'ns-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    constructor(private config: AppConfig,
                private page: Page,
                public me: MeManager) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    logout(): void {
        this.config.authorization = null;
    }

}
