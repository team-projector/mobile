import { Field, Model, Name } from 'serialize-ts';


@Model()
export class UserMetrics {

    @Field()
    bonus: number;

    @Field()
    penalty: number;

    @Field()
    @Name('issues_opened_count')
    issuesOpenedCount: number;

    @Field()
    @Name('payroll_closed')
    payrollClosed: number;

    @Field()
    @Name('payroll_opened')
    payrollOpened: number;

    @Field()
    @Name('issues_closed_spent')
    issuesClosedSpent: number;

    @Field()
    @Name('issues_opened_spent')
    issuesOpenedSpent: number;

}

