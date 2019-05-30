import { Injectable } from '@angular/core';
import * as localStorage from 'nativescript-localstorage';
import { BehaviorSubject } from 'rxjs';
import { WorkingIssue } from '~/app/models/issue';

const ISSUES_KEY = 'Issues';

@Injectable({providedIn: 'root'})
export class IssuesManager {

    issues$: BehaviorSubject<WorkingIssue[]> = new BehaviorSubject<WorkingIssue[]>((() => {
        return (JSON.parse(localStorage.getItem(ISSUES_KEY)) as WorkingIssue[]) || [];
    })());

    set issues(issues: WorkingIssue[]) {
        if (!!issues) {
            localStorage.setItem(ISSUES_KEY, JSON.stringify(issues));
        } else {
            localStorage.removeItem(ISSUES_KEY);
        }

        this.issues$.next(issues);
    }

    get issues(): WorkingIssue[] {
        return this.issues$.getValue();
    }

    get(id: number): WorkingIssue {
        return this.issues.find(issue => !!issue && +issue.id === +id);
    }

    play(issue: WorkingIssue) {
        const issues = this.issues;
        issues.push(issue);
        this.issues = issues;
    }

    stop(id: number) {
        const issues = this.issues;
        issues.splice(issues.findIndex(issue => !!issue && +issue.id === +id), 1);
        this.issues = issues;
    }
}
