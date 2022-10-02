import { CreatePlan } from '@application/dtos/create-plan.dto'
import { UpdatePlan } from '@application/dtos/update-plan.dto'
import { PlansRepository } from '@application/repositories/plans/plans.repository'
import { Plan, PrismaClient } from '@prisma/client'

export class PlansService {
  constructor(
    private readonly plansRepository: PlansRepository,
    private readonly db: PrismaClient
  ) {}

  async find(id: string) {
    return await this.plansRepository.find(id)
  }

  async findAll() {
    return await this.plansRepository.findAll()
  }

  async create(data: CreatePlan) {
    return await this.plansRepository.create(data)
  }

  async update(data: UpdatePlan) {
    return await this.plansRepository.update(data)
  }

  async delete (id: string) {
    return await this.plansRepository.delete(id)
  }

  findByQuery(q: string) {
    const likeSearch = `%${q}%`
    return this.db.$queryRaw<Plan[]>`SELECT *
    FROM "Plan"
    WHERE UPPER("name") LIKE UPPER(${likeSearch})
    OR UPPER("description") LIKE UPPER(${likeSearch})`
  }

  async findAllByCustomer(customerId: string) {
    return await this.db.plan.findMany({ where: { customers: { some: { id: customerId } } } })
  }
}
