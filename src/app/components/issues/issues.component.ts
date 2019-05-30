import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { ios } from 'tns-core-modules/application';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { IssuesManager } from '~/app/managers/issues.manager';
import { MeManager } from '~/app/managers/me.manager';
import { IssueCard, IssuesFilter } from '~/app/models/issue';
import { Me } from '~/app/models/me';
import { IssuesService } from '~/app/services/issues.service';

@Component({
    selector: 'issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

    user: Me;
    issues: IssueCard[];
    transitions: string[] = [];

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

        this.me.user$.subscribe(user => this.user = user);
        this.issuesService.list(new IssuesFilter())
            .subscribe(paging => this.issues = paging.results);
    }

    select(item: ItemEventData): void {
        this.router.navigate([this.issues[item.index].id], {
            relativeTo: this.route,
            animated: true,
            transition: {
                name: this.transitions[Math.floor(Math.random() * this.transitions.length)],
                duration: 380,
                curve: 'easeIn'
            }
        });
    }
}
