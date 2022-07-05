import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { Customer } from "@domain/customer.model";
import { PrismaClient } from "@prisma/client";
import { CustomersRepository } from "./customers.repository";


export class CustomersPrismaRepository implements CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    create(data: CreateCustomer): Promise<Customer> {
        return this.prisma.customer.create({ data });
    }

    getByDocument(document: string): Promise<Customer> {
        return this.prisma.customer.findFirst({ where: { document } });
    }

    findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany();
    }
}
