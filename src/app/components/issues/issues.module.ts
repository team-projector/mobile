import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { IssueDetailComponent } from '~/app/components/issues/issue-detail/issue-detail.component';
import { IssuesRoutingModule } from '~/app/components/issues/issues-routing.module';
import { IssuesComponent } from '~/app/components/issues/issues.component';
import { AuthorizationGuard } from '~/app/guards/authorization.guard';
import { DurationPipe } from '~/app/pipes/date';
import { DatePipesModule } from '~/app/pipes/date-pipes.module';

@NgModule({
    imports: [
        RouterModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        IssuesRoutingModule,
        DatePipesModule
    ],
    declarations: [
        IssuesComponent,
        IssueDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        AuthorizationGuard,
        DurationPipe
    ]
})
export class IssuesModule {
}
