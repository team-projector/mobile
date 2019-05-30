import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IssuesManager } from '~/app/managers/issues.manager';
import { Issue, WorkingIssue } from '~/app/models/issue';
import { IssuesService } from '~/app/services/issues.service';

@Component({
    selector: 'ns-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

    private _id: number;
    private _working: WorkingIssue;

    issue: Issue;
    loading = false;
    playing = false;
    now = new Date();

    set id(id: number) {
        this._id = id;
        this.load();
    }

    get id() {
        return this._id;
    }

    set working(working: WorkingIssue) {
        this._working = working;
        this.playing = !!working;
    }

    get working() {
        return this._working;
    }

    constructor(private issuesService: IssuesService,
                private route: ActivatedRoute,
                public issuesManager: IssuesManager) {
    }

    ngOnInit() {
        this.route.params.subscribe(({id}) => this.id = id);
        setInterval(() => this.now = new Date(), 1000);
    }

    load() {
        this.working = this.issuesManager.get(this.id);
        this.loading = true;
        this.issuesService.get(this.id).pipe(finalize(() => this.loading = false))
            .subscribe(issue => this.issue = issue);
    }

    play(): void {
        this.working = new WorkingIssue({id: this.id, start: (new Date()).toString()});
        this.issuesManager.play(this.working);
    }

    stop(): void {
        this.working = null;
        console.log(this.id);
        this.issuesManager.stop(this.id);
    }
}
