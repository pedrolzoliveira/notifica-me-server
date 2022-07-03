import { CreateNotification } from "@application/dtos/create-notification.dto";
import { Notification } from "@domain/notification.model";
import { NotificationsRepository } from "./notifications.repository";

import { PrismaClient } from "@prisma/client"

export class NotificationsPrismaRepository implements NotificationsRepository {

    constructor(private prisma: PrismaClient) {}

    async create(data: CreateNotification): Promise<Notification> {
        return this.prisma.notification.create({ data, select: { event: true, receiver: true, createdAt: true } });
    }
}