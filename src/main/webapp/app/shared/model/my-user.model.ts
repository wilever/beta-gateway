export interface IMyUser {
    id?: number;
    name?: string;
}

export class MyUser implements IMyUser {
    constructor(public id?: number, public name?: string) {}
}
