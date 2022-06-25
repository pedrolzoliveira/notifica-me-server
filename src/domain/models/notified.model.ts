import { Customer } from "@domain/models/customer.model";

export class Notified {
    constructor(public customer: Customer, public name: string) {}
}