import { CreatePlan } from '@application/dtos/create-plan.dto'
import { UpdatePlan } from '@application/dtos/update-plan.dto'
import { PlansRepository } from '@application/repositories/plans/plans.repository'

export class PlansService {
  constructor(
    private readonly plansRepository: PlansRepository
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
}
