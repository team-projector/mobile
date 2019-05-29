import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { deserialize } from 'serialize-ts';
import { Me } from '~/app/models/me';
import { HttpService } from '~/app/services/http.service';
import { encodeObject } from '~/app/utils/http';

@Injectable({
    providedIn: 'root'
})
export class MeService {

    constructor(private http: HttpService) {
    }

    getUser(metrics: boolean = false): Observable<Me> {
        return this.http.get('me/user', encodeObject({metrics: metrics}))
            .pipe(map(obj => deserialize(obj, Me)));
    }

}
