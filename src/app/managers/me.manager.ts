import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { AppConfig } from '~/app-config';
import { Me } from '~/app/models/me';
import { MeService } from '~/app/services/me.service';

@Injectable({providedIn: 'root'})
export class MeManager {

    user$: BehaviorSubject<Me> = new BehaviorSubject<Me>(null);

    set user(user: Me) {
        if (JSON.stringify(this.user) !== JSON.stringify(user)) {
            this.user$.next(user);
        }
    }

    get user(): Me {
        return this.user$.getValue();
    }

    logged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.user);

    set logged(logged: boolean) {
        if (this.logged !== logged) {
            this.logged$.next(logged);
        }
    }

    get logged() {
        return this.logged$.getValue();
    }

    constructor(private meService: MeService,
                private config: AppConfig,
                private router: Router) {

        this.config.authorization$.subscribe(token => {
            if (!!token) {
                this.meService.getUser().subscribe(user => this.user = user, () => this.user = null);
            } else {
                this.user = null;
                this.router.navigate(['/login']);
            }
        });

        this.user$.pipe(map(user => !!user), distinctUntilChanged())
            .subscribe(logged => this.logged = logged);
    }
}
