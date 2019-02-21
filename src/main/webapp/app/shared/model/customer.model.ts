import { IMyUser } from 'app/shared/model/my-user.model';

export interface ICustomer {
    id?: number;
    firstName?: string;
    lastName?: string;
    organization?: string;
    email?: string;
    phoneNumber?: string;
    accountAddress?: string;
    user?: IMyUser;
}

export class Customer implements ICustomer {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public organization?: string,
        public email?: string,
        public phoneNumber?: string,
        public accountAddress?: string,
        public user?: IMyUser
    ) {}
}
