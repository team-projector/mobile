import { Field } from 'serialize-ts';

export class LabelCard {

    @Field()
    title: string;

    @Field()
    color: string;

}
