import { CreateCustomer } from '@application/dtos/create-customer.dto'
import { Customer } from '@domain/customer.model'
import { PrismaClient } from '@prisma/client'
import { CustomersRepository } from './customers.repository'

export class CustomersPrismaRepository implements CustomersRepository {
  constructor(
    private readonly prisma: PrismaClient
  ) {}

  async create(data: CreateCustomer): Promise<Customer> {
    return await this.prisma.customer.create({
      select: {
        id: true,
        name: true,
        email: true
      },
      data
    })
  }

  async findAll(): Promise<Customer[]> {
    return await this.prisma.customer.findMany({
      select: {
        id: true,
        name: true,
        email: true
      }
    })
  }

  async findByEmail(email: string): Promise<Customer & { passwordHash: string }> {
    return await this.prisma.customer.findUnique({
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true
      },
      where: {
        email
      }
    })
  }
}
