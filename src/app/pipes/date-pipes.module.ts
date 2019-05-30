import { NgModule } from '@angular/core';
import { DifferencePipe, DurationPipe } from './date';

@NgModule({
    declarations: [
        DurationPipe,
        DifferencePipe
    ],
    exports: [
        DurationPipe,
        DifferencePipe
    ]
})
export class DatePipesModule {
}
