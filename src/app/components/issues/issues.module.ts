import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { IssueDetailComponent } from '~/app/components/issues/issue-detail/issue-detail.component';
import { IssuesRoutingModule } from '~/app/components/issues/issues-routing.module';
import { IssuesComponent } from '~/app/components/issues/issues.component';
import { DatePipesModule } from '~/app/pipes/date-pipes.module';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        IssuesRoutingModule,
        DatePipesModule
    ],
    declarations: [
        IssuesComponent,
        IssueDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class IssuesModule {
}
