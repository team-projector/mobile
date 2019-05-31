import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { MeManager } from '~/app/managers/me.manager';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _current: string;

    set current(current: string) {
        this._current = current;
        this.router.navigate([current], {
            animated: true,
            transition: {name: 'curl', duration: 200, curve: 'easeIn'}
        });
    }

    get current() {
        return this._current;
    }

    constructor(private router: RouterExtensions,
                public me: MeManager) {
    }

    ngOnInit() {
        this.current = 'issues';
    }
}
