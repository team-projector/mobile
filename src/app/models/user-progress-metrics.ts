import { format } from 'date-fns';
import { Field, Model, Name, Type } from 'serialize-ts';
import { DATE_FORMAT } from '~/consts';
import { DateSerializer } from '../serializers/date';

export enum MetricsGroup {
    day = 'day',
    week = 'week'
}

@Model()
export class UserProgressMetrics {

    @Field()
    @Type(new DateSerializer())
    start: Date;

    @Field()
    @Type(new DateSerializer())
    end: Date;

    @Field()
    @Name('time_estimate')
    timeEstimate: number;

    @Field()
    @Name('time_spent')
    timeSpent: number;

    @Field()
    @Name('time_remains')
    timeRemains: number;

    @Field()
    @Name('planned_work_hours')
    plannedWorkHours: number;

    @Field()
    efficiency: number;

    @Field()
    loading: number;

    @Field()
    @Name('payroll_closed')
    payrollClosed: number;

    @Field()
    @Name('payroll_opened')
    payrollOpened: number;

    @Field()
    payroll: number;

    @Field()
    paid: number;

    @Field()
    issues_count: number;

    getKey(): string {
        return format(this.start, 'DD/MM/YYYY');
    }

}

@Model()
export class UserMetricsFilter {

    @Field()
    @Type(new DateSerializer(DATE_FORMAT))
    start?: Date;

    @Field()
    @Type(new DateSerializer(DATE_FORMAT))
    end?: Date;

    @Field()
    group?: MetricsGroup;

    constructor(defs: UserMetricsFilter = null) {
        if (!!defs) {
            Object.assign(this, defs);
        }
    }

}
