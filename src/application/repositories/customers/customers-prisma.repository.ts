import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { Customer } from "@domain/customer.model";
import { PrismaClient } from "@prisma/client";
import { CustomersRepository } from "./customers.repository";


export class CustomersPrismaRepository implements CustomersRepository {
    constructor(
        private prisma: PrismaClient
    ) {}

    create(data: CreateCustomer): Promise<Customer> {
        return this.prisma.customer.create({
            select: {
                id: true,
                name: true,
                email: true,
            },
            data
        });
    }

    findAll(): Promise<Customer[]> {
        return this.prisma.customer.findMany();
    }

    findByEmail(email: string): Promise<Customer & { passwordHash: string }> {
        return this.prisma.customer.findUnique({
            select: {
                id: true,
                email: true,
                name: true,
                passwordHash: true,
            },
            where: {
                email
            }
        });
    }
}
