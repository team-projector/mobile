import { Field, Model } from 'serialize-ts';

@Model()
export class UserCredentials {

    @Field()
    login: string;

    @Field()
    password: string;

    constructor(defs: UserCredentials = null) {
        if (!!defs) {
            Object.assign(this, defs);
        }
    }

}
