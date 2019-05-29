import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthorizationGuard } from '~/app/guards/authorization.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/issues',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: '~/app/components/login/login.module#LoginModule'
    },
    {
        path: 'issues',
        loadChildren: '~/app/components/issues/issues.module#IssuesModule',
        canActivate: [AuthorizationGuard]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
