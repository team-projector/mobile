import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Issue, IssuesFilter, PagingIssues } from '~/app/models/issue';
import { HttpService } from '~/app/services/http.service';
import { encodeModel } from '~/app/utils/http';

@Injectable({
    providedIn: 'root'
})
export class IssuesService {

    constructor(private http: HttpService) {
    }

    list(filter: IssuesFilter): Observable<PagingIssues> {
        return this.http.get('issues', encodeModel(filter))
            .pipe(map(obj => deserialize(obj, PagingIssues)));
    }

    get(id: number): Observable<Issue> {
        return this.http.get(`issues/${id}`)
            .pipe(map(obj => deserialize(obj, Issue)));
    }

}
