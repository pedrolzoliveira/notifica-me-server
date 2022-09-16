import { CreateReceiver } from '@application/dtos/create-receiver.dto'
import { RegisterEventCustomer } from '@application/dtos/register-event-customer.dto'
import { UpdateReceiver } from '@application/dtos/update-receiver.dto'
import { DeleteReceiverDTO } from '@application/dtos/delete-receiver.dto'
import { ReceiversRepository } from '@application/repositories/receivers/receivers.repository'
import { HasPermissionReceiverDTO } from '@application/dtos/has-permission-receiver.dto'
import { PrismaClient } from '@prisma/client'
export class ReceiversService {
  constructor(
    private readonly receiversRepository: ReceiversRepository,
    private readonly db: PrismaClient
  ) {}

  async findAll(customerId: string) {
    return await this.receiversRepository.findAll(customerId)
  }

  async create(data: CreateReceiver) {
    return await this.receiversRepository.create(data)
  }

  async update(data: UpdateReceiver) {
    return await this.receiversRepository.update(data)
  }

  async registerEvent(data: RegisterEventCustomer) {
    return await this.receiversRepository.registerEvent(data)
  }

  async delete (data: DeleteReceiverDTO) {
    return await this.receiversRepository.delete(data)
  }

  async hasPermission(data: HasPermissionReceiverDTO) {
    const receiver = await this.db.receiver.findUnique({ select: { customerId: true }, where: { id: data.id } })
    return receiver.customerId === data.customerId
  }
}
