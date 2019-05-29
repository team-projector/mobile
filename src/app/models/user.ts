import { ArraySerializer, Field, Model, Type } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist/serializers/primitive.serializer';
import { UserMetrics } from '~/app/models/user-metrics';

export enum UserPermission {
    inviteUser = 'intite_user',
}

export enum UserRole {
    developer = 'developer',
    teamLeader = 'team_leader',
    projectManager = 'project_manager',
    customer = 'customer',
    shareholder = 'shareholder'
}

@Model()
export class User {

    @Field()
    id: number;

    @Field()
    login: string;

    @Field()
    name: string;

    @Field()
    avatar: string;

    @Field()
    @Type(new ArraySerializer(new PrimitiveSerializer()))
    roles: UserRole[];

    @Field()
    metrics: UserMetrics;

}

@Model()
export class UserCard {

    @Field()
    id: number;

    @Field()
    login: string;

    @Field()
    name: string;

    @Field()
    avatar: string;

    @Field()
    @Type(new ArraySerializer(new PrimitiveSerializer()))
    roles: UserRole[];

    @Field()
    metrics: UserMetrics;

}
