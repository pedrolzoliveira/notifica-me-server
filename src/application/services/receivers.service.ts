import { CreateReceiver } from '@application/dtos/create-receiver.dto';
import { RegisterEventCustomer } from '@application/dtos/register-event-customer.dto';
import { UpdateReceiver } from '@application/dtos/update-receiver.dto';
import { DeleteReceiverDTO } from '@application/dtos/delete-receiver.dto';
import { ReceiversRepository } from '@application/repositories/receivers/receivers.repository';
import { HasPermissionReceiverDTO } from '@application/dtos/has-permission-receiver.dto';
import { PrismaClient } from '@prisma/client';
export class ReceiversService {
  constructor(
    private readonly receiversRepository: ReceiversRepository,
    private readonly db: PrismaClient
  ) {}

  findAll(customerId: string) {
    return this.receiversRepository.findAll(customerId)
    }

  create(data: CreateReceiver) {
    return this.receiversRepository.create(data)
    }

  update(data: UpdateReceiver) {
    return this.receiversRepository.update(data)
    }

  registerEvent(data: RegisterEventCustomer) {
    return this.receiversRepository.registerEvent(data)
    }

  delete async (data: DeleteReceiverDTO) {
    return this.receiversRepository.delete(data)
    }

  async hasPermission(data: HasPermissionReceiverDTO) {
    const receiver = await this.db.receiver.findUnique({ select: { customerId: true }, where: { id: data.id } })
        return receiver.customerId === data.customerId
    }
}
