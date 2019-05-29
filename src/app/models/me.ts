import { ArraySerializer, Field, Model, Type } from 'serialize-ts';
import { PrimitiveSerializer } from 'serialize-ts/dist/serializers/primitive.serializer';
import { User, UserPermission } from './user';

@Model()
export class Me extends User {

    @Field()
    @Type(new ArraySerializer(new PrimitiveSerializer()))
    permissions: UserPermission[];

}
