import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular';
import { finalize } from 'rxjs/operators';
import { Page } from 'tns-core-modules/ui/page';
import { AppConfig } from '~/app-config';
import { UserCredentials } from '~/app/models/user-credentials';
import { UsersService } from '~/app/services/users.service';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    credentials: UserCredentials = new UserCredentials();
    loading = false;

    constructor(private usersService: UsersService,
                private page: Page,
                private config: AppConfig,
                private router: RouterExtensions) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    login() {
        this.loading = true;
        this.usersService.login(this.credentials).pipe(finalize(() => this.loading = false))
            .subscribe(authorization => {
                this.config.authorization = authorization;
                this.router.navigate(['/issues'], {
                    animated: true,
                    transition: {name: 'slide', duration: 200, curve: 'easeIn'}
                });
            });
    }
}
