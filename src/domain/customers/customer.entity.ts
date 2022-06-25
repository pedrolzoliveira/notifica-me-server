type CustomerType = "individual" | "company";

export class Customer {
    constructor (public customerType: CustomerType, public document: string, public name: string) {}
}