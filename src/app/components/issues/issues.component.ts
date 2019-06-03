import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { finalize } from 'rxjs/operators';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { Page } from 'tns-core-modules/ui/page';
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
                private page: Page,
                public issuesManager: IssuesManager,
                public me: MeManager) {
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
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
}
