import { Injectable } from '@angular/core';
import { Authorization } from 'junte-angular';
import * as localStorage from 'nativescript-localstorage';
import { BehaviorSubject } from 'rxjs';

const DEFAULT_LANGUAGE = 'en';
const AUTHORIZATION_KEY = 'Authorization';

const APP_VERSION = '1.0.0';

@Injectable({providedIn: 'root'})
export class AppConfig {
    version = APP_VERSION;

    authorization$ = new BehaviorSubject<Authorization>((() => {
        if (!!localStorage.getItem(AUTHORIZATION_KEY)) {
            return JSON.parse(localStorage.getItem(AUTHORIZATION_KEY)) as Authorization;
        }

        return null;
    })());

    set authorization(authorization: Authorization) {
        if (!!authorization) {
            localStorage.setItem(AUTHORIZATION_KEY, JSON.stringify(authorization));
        } else {
            localStorage.removeItem(AUTHORIZATION_KEY);
        }

        this.authorization$.next(authorization);
    }

    get authorization() {
        return this.authorization$.getValue();
    }

    language$ = new BehaviorSubject<string>(!!localStorage.language ? localStorage.language : DEFAULT_LANGUAGE);

    set language(language: string) {
        localStorage.setItem('language', language);
        this.language$.next(language);
    }

    get language() {
        return this.language$.getValue();
    }

    backendEndpoint = 'https://teamprojector.com/api';
}
