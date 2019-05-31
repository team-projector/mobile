import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ProfileRoutingModule } from '~/app/components/profile/profile-routing.module';
import { ProfileComponent } from '~/app/components/profile/profile.component';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        NativeScriptCommonModule,
        ProfileRoutingModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule {
}
