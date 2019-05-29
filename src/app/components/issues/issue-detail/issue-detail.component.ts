import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IssueCard } from '~/app/models/issue';
import { IssuesService } from '~/app/services/issues.service';

@Component({
    selector: 'ns-issue-detail',
    templateUrl: './issue-detail.component.html',
    styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

    private _id: number;
    issue: IssueCard;

    set id(id: number) {
        this._id = id;
        this.load();
    }

    get id() {
        return this._id;
    }

    constructor(private issuesService: IssuesService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(({id}) => this.id = id);
    }

    load() {
        // this.issuesService.get(this.id)
        //     .subscribe(issue => this.issue = issue);
    }

}
