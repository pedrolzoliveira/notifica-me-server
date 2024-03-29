import { Receiver } from '@domain/receiver.model'
import { ReceiversRepository } from './receivers.repository'
import { Event, PrismaClient } from '@prisma/client'
import { CreateReceiver } from '@application/dtos/create-receiver.dto'
import { RegisterEventCustomer } from '@application/dtos/register-event-customer.dto'
import { UpdateReceiver } from '@application/dtos/update-receiver.dto'
import { DeleteReceiverDTO } from '@application/dtos/delete-receiver.dto'

export class ReceiversPrismaRepository implements ReceiversRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByEvent(code: string): Promise<Receiver[]> {
    const receivers = await this.prisma.receiver.findMany({
      where: {
        events: {
          some: { code }
        }
      }
    })
    return receivers
  }

  async create(data: CreateReceiver): Promise<Receiver> {
    return await this.prisma.receiver.create({ data })
  }

  async registerEvent(data: RegisterEventCustomer): Promise<void> {
    await this.prisma.receiver.update({
      where: { id: data.receiverId },
      data: {
        events: {
          connect: { code: data.eventCode }
        }
      }
    })
  }

  async findAll(customerId: string): Promise<Receiver[]> {
    return await this.prisma.receiver.findMany({
      select: {
        id: true,
        name: true,
        customerId: true,
        number: true,
        messenger: true,
        events: true
      },
      where: { customerId }
    })
  }

  async delete(data: DeleteReceiverDTO): Promise<void> {
    const receiver = await this.prisma.receiver.findUnique({
      select: {
        customerId: true
      },
      where: {
        id: data.id
      }
    })
    if (receiver.customerId === data.customerId) {
      await this.prisma.receiver.delete({ where: { id: data.id } })
    }
  }

  async update(data: UpdateReceiver): Promise<Receiver> {
    const receiver = await this.prisma.receiver.update({
      select: {
        id: true,
        name: true,
        number: true,
        messenger: true,
        customerId: true,
        events: true
      },
      where: { id: data.id },
      data: {
        name: data.name,
        events: {
          set: data.events.map(event => ({ code: event }))
        }
      }
    })
    return receiver
  }

  async getUnotifiedReceivers(event: Event): Promise<Receiver[]> {
    const notifications = await this.prisma.notification.findMany({
      select: {
        receiverId: true
      },
      where: { eventId: event.id }
    })

    const receivers = await this.prisma.receiver.findMany({
      where: {
        id: {
          notIn: notifications.map(notification => notification.receiverId)
        },
        events: {
          some: { code: event.code }
        }
      }
    })
    return receivers
  }
}
