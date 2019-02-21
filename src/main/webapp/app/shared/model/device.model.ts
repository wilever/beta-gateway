export interface IDevice {
    id?: number;
    name?: string;
    description?: string;
    accountAddress?: string;
}

export class Device implements IDevice {
    constructor(public id?: number, public name?: string, public description?: string, public accountAddress?: string) {}
}
