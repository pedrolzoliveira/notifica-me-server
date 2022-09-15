import { CreatePlan } from '@application/dtos/create-plan.dto';
import { UpdatePlan } from '@application/dtos/update-plan.dto';
import { PlansRepository } from '@application/repositories/plans/plans.repository';

export class PlansService {
  constructor(
    private readonly plansRepository: PlansRepository
  ) {}

  find(id: string) {
    return this.plansRepository.find(id)
    }

  findAll() {
    return this.plansRepository.findAll()
    }

  create(data: CreatePlan) {
    return this.plansRepository.create(data)
    }

  update(data: UpdatePlan) {
    return this.plansRepository.update(data)
    }

  delete async (id: string) {
    return this.plansRepository.delete(id)
    }
}
