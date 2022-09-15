import { Plan } from '@domain/plan.model'

import { CreatePlan } from '@application/dtos/create-plan.dto'
import { UpdatePlan } from '@application/dtos/update-plan.dto'

export interface PlansRepository {
  create: (data: CreatePlan) => Promise<Plan>
  find: (id: string) => Promise<Plan>
  findAll: () => Promise<Plan[]>
  update: (data: UpdatePlan) => Promise<Plan>
  delete: (id: string) => Promise<void>
}
