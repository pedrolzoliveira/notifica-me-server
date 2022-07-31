import { CreatePlan } from "@application/dtos/create-plan.dto";
import { UpdatePlan } from "@application/dtos/update-plan.dto";
import { Plan } from "@domain/plan.model";
import { PrismaClient } from "@prisma/client";
import { PlansRepository } from "./plans.repository";

export class PlansPrismaRepository implements PlansRepository {

    constructor(
        private prisma: PrismaClient
    ) {}

    create(data: CreatePlan): Promise<Plan> {
        return this.prisma.plan.create({
            data: {
                ...data,
                events: {
                    connect: data.events.map(event => {
                        return { code: event }
                    })
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                events: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async find(id: string): Promise<Plan> {
        return this.prisma.plan.findUnique({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                events: true,
                createdAt: true,
                updatedAt: true
            },
            where: { id } 
        });
    }

    findAll(): Promise<Plan[]> {
        return this.prisma.plan.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                events: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async update(data: UpdatePlan): Promise<Plan> {
        return this.prisma.plan.update({
            data: {
                ...data,
                events: {
                    set: data.events?.map(event => {
                        return { code: event }
                    })
                }
            },
            where: {
                id: data.id 
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                events: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.plan.delete({ where: { id } }); 
    }
}