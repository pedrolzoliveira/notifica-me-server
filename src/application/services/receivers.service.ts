import { CreateReceiver } from "@application/dtos/create-receiver.dto";
import { RegisterEventCustomer } from "@application/dtos/register-event-customer.dto";
import { UpdateReceiver } from "@application/dtos/update-receiver.dto";
import { DeleteReceiverDTO } from "@application/dtos/delete-receiver.dto";
import { ReceiversRepository } from "@application/repositories/receivers/receivers.repository";

export class ReceiversService {
    constructor(
        private receiversRepository: ReceiversRepository
    ) {}

    findAll(customerId: string) {
        return this.receiversRepository.findAll(customerId);
    }

    create(data: CreateReceiver) {
        return this.receiversRepository.create(data);
    }

    update(data: UpdateReceiver) {
        return this.receiversRepository.update(data);
    }

    registerEvent(data: RegisterEventCustomer) {
        return this.receiversRepository.registerEvent(data);
    }

    delete(data: DeleteReceiverDTO) {
        return this.receiversRepository.delete(data);
    }
}
