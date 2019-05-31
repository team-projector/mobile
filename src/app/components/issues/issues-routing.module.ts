import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { IssueDetailComponent } from '~/app/components/issues/issue-detail/issue-detail.component';
import { IssuesComponent } from '~/app/components/issues/issues.component';

const routes: Routes = [
    {
        path: '',
        component: IssuesComponent
    },
    {
        path: ':id',
        component: IssueDetailComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class IssuesRoutingModule {
}
