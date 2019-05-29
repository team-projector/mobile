import { Field, Model } from 'serialize-ts';

@Model()
export class ObjectLink {

    @Field()
    id: number;

    @Field()
    presentation: string;

}

