import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { finalize } from 'rxjs/operators';
import * as app from 'tns-core-modules/application';
import { ios } from 'tns-core-modules/application';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { IssuesManager } from '~/app/managers/issues.manager';
import { MeManager } from '~/app/managers/me.manager';
import { IssueCard, IssuesFilter, IssueState } from '~/app/models/issue';
import { Me } from '~/app/models/me';
import { IssuesService } from '~/app/services/issues.service';

@Component({
    selector: 'issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

    private _user: Me;
    issues: IssueCard[] = [];
    transitions: string[] = [];
    loading = false;

    set user(user: Me) {
        this._user = user;
        if (!!user) {
            this.load();

        } else {
            this.issues = [];
        }
    }

    get user() {
        return this._user;
    }

    constructor(private issuesService: IssuesService,
                private router: RouterExtensions,
                private route: ActivatedRoute,
                public issuesManager: IssuesManager,
                public me: MeManager) {
    }

    ngOnInit(): void {
        if (ios) {
            this.transitions = ['curl', 'curlDown', 'fade', 'flip', 'flipLeft', 'slide', 'slideRight', 'slideTop', 'slideBottom'];
        } else {
            this.transitions = ['explode', 'fade', 'flip', 'flipLeft', 'slide', 'slideRight', 'slideTop', 'slideBottom'];
        }

        this.loading = true;
        this.me.user$.pipe(finalize(() => this.loading = false))
            .subscribe(user => this.user = user);
    }

    load() {
        const filter = new IssuesFilter({user: this.user.id, state: IssueState.opened});
        this.loading = true;
        this.issuesService.list(filter)
            .pipe(finalize(() => this.loading = false))
            .subscribe(paging => this.issues = paging.results);
    }

    select(item: ItemEventData): void {
        this.router.navigate([this.issues[item.index].id], {
            relativeTo: this.route,
            animated: true,
            transition: {name: 'slide', duration: 200, curve: 'easeIn'}
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
