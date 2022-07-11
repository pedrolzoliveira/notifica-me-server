import { CreateReceiver } from "@application/dtos/create-receiver.dto";
import { RegisterEventCustomer } from "@application/dtos/register-event-customer.dto";
import { ReceiversRepository } from "@application/repositories/receivers/receivers.repository";



export class ReceiversService {
    constructor(
        private receiversRepository: ReceiversRepository
    ) {}

    findAll() {
        return this.receiversRepository.findAll();
    }

    create(data: CreateReceiver) {
        return this.receiversRepository.create(data);
    }

    registerEvent(data: RegisterEventCustomer) {
        return this.receiversRepository.registerEvent(data);
    }

    delete(id: string) {
        return this.receiversRepository.delete(id);
    }
}
