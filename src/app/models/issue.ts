import { ArraySerializer, Field, Model, ModelSerializer, Name, Type } from 'serialize-ts';
import { LabelCard } from '~/app/models/label';
import { DATE_FORMAT } from '~/consts';
import { DateSerializer } from '../serializers/date';
import { BooleanSerializer } from '../serializers/http';
import { ObjectLink } from './object-link';
import { Paging } from './paging';
import { UserCard } from './user';

export enum IssueState {
    opened = 'opened',
    closed = 'closed'
}

@Model()
export class IssueMetrics {

    @Field()
    remains: number;

    @Field()
    efficiency: number;

    @Field()
    paid: number;

    @Field()
    payroll: number;

}

@Model()
export class Issue {

    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
    labels: LabelCard[];

    @Field()
    project: ObjectLink;

    @Field()
    @Name('due_date')
    @Type(new DateSerializer())
    dueDate: Date;

    @Field()
    @Name('time_estimate')
    timeEstimate: number;

    @Field()
    @Name('time_spent')
    timeSpent: number;

    @Field()
    @Name('total_time_spent')
    totalTimeSpent: number;

    @Field()
    @Name('gl_url')
    glUrl: string;

    @Field()
    state: IssueState;

    @Field()
    metrics: IssueMetrics;

    @Field()
    milestone: ObjectLink;

    @Field()
    @Type(new ArraySerializer(new ModelSerializer(UserCard)))
    participants: UserCard[];

    @Field()
    user: ObjectLink;
}

@Model()
export class IssueCard {

    @Field()
    id: number;

    @Field()
    title: string;

    @Field()
    @Type(new ArraySerializer(new ModelSerializer(LabelCard)))
    labels: LabelCard[];

    @Field()
    project: ObjectLink;

    @Field()
    @Name('due_date')
    @Type(new DateSerializer())
    dueDate: Date;

    @Field()
    @Name('time_estimate')
    timeEstimate: number;

    @Field()
    @Name('time_spent')
    timeSpent: number;

    @Field()
    @Name('total_time_spent')
    totalTimeSpent: number;

    @Field()
    @Name('gl_url')
    glUrl: string;

    @Field()
    state: IssueState;

    @Field()
    metrics: IssueMetrics;

    @Field()
    milestone: ObjectLink;

    @Field()
    @Type(new ArraySerializer(new ModelSerializer(UserCard)))
    participants: UserCard[];

    @Field()
    user: ObjectLink;
}

@Model()
export class WorkingIssue {
    @Field()
    id: number;
    @Field()
    start: string;

    constructor(defs: WorkingIssue = null) {
        if (!!defs) {
            Object.assign(this, defs);
        }
    }
}

@Model()
export class PagingIssues implements Paging<IssueCard> {

    @Field()
    count: number;

    @Field()
    @Type(new ArraySerializer(new ModelSerializer(IssueCard)))
    results: IssueCard[];

}

@Model()
export class IssuesFilter {

    @Field()
    @Type(new BooleanSerializer())
    metrics?: boolean;

    @Field()
    user?: number;

    @Field()
    @Name('q')
    query?: string;

    @Field()
    @Type(new DateSerializer(DATE_FORMAT))
    @Name('due_date')
    dueDate?: Date;

    @Field()
    state?: IssueState;

    @Field()
    sort?: string;

    @Field()
    page?: number;

    @Field()
    @Name('page_size')
    pageSize?: number;

    constructor(defs: IssuesFilter = null) {
        this.metrics = true;
        if (!!defs) {
            Object.assign(this, defs);
        }
    }

}


