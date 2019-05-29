import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    constructor(private usersService: UsersService,
                private config: AppConfig,
                private router: Router) {
    }

    ngOnInit() {
    }

    login() {
        this.usersService.login(this.credentials)
            .subscribe(authorization => {
                this.config.authorization = authorization;
                this.router.navigate(['/issues']);
            });
    }

    gitlab() {

    }
}
