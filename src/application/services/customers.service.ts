import { CreateCustomer } from "@application/dtos/create-customer.dto";
import { CustomersRepository } from "@application/repositories/customers/customers.repository";

export class CustomersService {
    constructor(
        private customersRepository: CustomersRepository
    ) {}

    create(data: CreateCustomer) {
        return this.customersRepository.create(data);
    }

    getByDocument(document: string) {
        return this.customersRepository.getByDocument(document);
    }

}