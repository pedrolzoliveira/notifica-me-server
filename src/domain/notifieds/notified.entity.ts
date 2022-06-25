import { Customer } from "@domain/customers/customer.entity";

export class Notified {
    constructor(public customer: Customer, public name: string) {}
}