import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { differenceInSeconds } from 'date-fns';
import { RouterExtensions } from 'nativescript-angular';
import { finalize } from 'rxjs/operators';
import { Page } from 'tns-core-modules/ui/page';
import { IssuesManager } from '~/app/managers/issues.manager';
import { Issue, WorkingIssue } from '~/app/models/issue';
import { DurationPipe } from '~/app/pipes/date';
import { IssuesService } from '~/app/services/issues.service';

@Component({
    selector: 'ns-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

    private _id: number;
    private _working: WorkingIssue;
    private _now = new Date();
    private interval: number;

    issue: Issue;
    loading = false;
    dialogOpen = false;
    spent: string;

    set id(id: number) {
        this._id = id;
        this.load();
    }

    get id() {
        return this._id;
    }

    set now(now: Date) {
        this._now = now;
        if (!!this.working) {
            this.spent = this.duration.transform(differenceInSeconds(now, this.working.start));
        }
    }

    get now() {
        return this._now;
    }

    set working(working: WorkingIssue) {
        this._working = working;
    }

    get working() {
        return this._working;
    }

    constructor(private issuesService: IssuesService,
                private route: ActivatedRoute,
                private router: RouterExtensions,
                private page: Page,
                private duration: DurationPipe,
                public issuesManager: IssuesManager) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.route.params.subscribe(({id}) => this.id = id);
        this.start();
    }

    start() {
        this.spent = '';
        clearInterval(this.interval);
        this.interval = setInterval(() => this.now = new Date(), 1000);
    }

    load() {
        this.loading = true;
        this.working = this.issuesManager.get(this.id);
        this.issuesService.get(this.id).pipe(finalize(() => this.loading = false))
            .subscribe(issue => this.issue = issue);
    }

    play(): void {
        this.working = new WorkingIssue({id: this.id, start: (new Date()).toString()});
        this.start();
        this.issuesManager.play(this.working);
    }

    stop(): void {
        this.working = null;
        this.issuesManager.stop(this.id);
        this.dialogOpen = false;
        this.issuesService.spend(this.id, this.parse())
            .subscribe(issue => this.issue = issue);
    }

    open() {
        clearInterval(this.interval);
        this.dialogOpen = true;
    }

    cancel() {
        this.start();
        this.dialogOpen = false;
    }

    parse() {
        const parts = this.spent.split(' ');
        const times = ['s', 'm', 'h', 'd'];
        let seconds = 0;

        parts.forEach(part => {
            const index = times.findIndex(time => part.indexOf(time) > -1);
            if (index > -1) {
                seconds += +part.replace(/\D+/, '') * Math.pow(60, index);
            }
        });
        return seconds;
    }
}
