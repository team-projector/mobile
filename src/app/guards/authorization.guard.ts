import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { Observable, of } from 'rxjs';
import { AppConfig } from '~/app-config';


@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(public config: AppConfig,
                private router: RouterExtensions) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (!this.config.authorization) {
            this.router.navigate(['/login', {redirect: route.url}]);
        }
        return of(!!this.config.authorization);
    }
}
