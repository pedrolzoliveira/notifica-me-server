import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { CustomersRepository } from "@application/repositories/customers/customers.repository";

export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository
    ) {}

    create(data: CreateCustomer) {
        return this.customersRepository.create(data);
    }

    findAll() {
        return this.customersRepository.findAll();
    }

    findByEmail(email: string) {
        return this.customersRepository.findByEmail(email);
    }

}