import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Authorization } from 'junte-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize, serialize } from 'serialize-ts';
import { ObjectLink } from '~/app/models/object-link';
import { User } from '~/app/models/user';
import { UserCredentials } from '~/app/models/user-credentials';
import { HttpService } from '~/app/services/http.service';
import { encodeObject } from '~/app/utils/http';

@Injectable({providedIn: 'root'})
export class UsersService {

    constructor(private http: HttpService) {
    }

    login(credentials: UserCredentials): Observable<Authorization> {
        return this.http.post<Authorization>('login', serialize(credentials))
            .pipe(map(obj => deserialize(obj, Authorization)));
    }

    gitlab(code: string, state: string): Observable<Authorization> {
        return this.http.get<Authorization>('complete/gitlab/',
            new HttpParams({fromObject: {code: code, state: state}}))
            .pipe(map(obj => deserialize(obj, Authorization)));
    }

    get(id: number, metrics: boolean = false): Observable<User> {
        return this.http.get(`users/${id}`, encodeObject({metrics: metrics}))
            .pipe(map(obj => deserialize(obj, User)));
    }

    links(): Observable<ObjectLink[]> {
        return this.http.get<any[]>('users/links')
            .pipe(map(arr => arr.map(el => deserialize(el, ObjectLink))));
    }
}
