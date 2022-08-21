import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { Customer } from "@domain/customer.model";


export interface CustomersRepository {
    create(data: CreateCustomer): Promise<Customer>;
    findAll(): Promise<Customer[]>;
    findByEmail(email: string): Promise<Customer & { passwordHash: string }>;
}