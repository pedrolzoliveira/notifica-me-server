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
        return this.prisma.plan.create({ data });
    }

    async find(id: string): Promise<Plan> {
        return this.prisma.plan.findUnique({ where: { id } });
    }

    findAll(): Promise<Plan[]> {
        return this.prisma.plan.findMany();
    }

    async update(data: UpdatePlan): Promise<Plan> {
        return this.prisma.plan.update({
            where: { id: data.id },
            data
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.plan.delete({ where: { id } }); 
    }
}