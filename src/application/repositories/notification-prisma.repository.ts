import { CreateNotification } from "@application/dtos/create-notification.dto";
import { Notification } from "@domain/notification.model";
import { NotificationRepository } from "./notification.repository";

import { PrismaClient } from "@prisma/client"

export class NotificationPrismaRepository implements NotificationRepository {

    constructor(private prisma: PrismaClient) {}

    create(data: CreateNotification): Promise<Notification> {
        
        
        return 
    }
}