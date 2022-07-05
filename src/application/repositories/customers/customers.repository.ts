import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { Customer } from "@domain/customer.model";


export interface CustomersRepository {
    create(data: CreateCustomer): Promise<Customer>;
    getByDocument(document: string): Promise<Customer | undefined>;
    findAll(): Promise<Customer[]>;
}