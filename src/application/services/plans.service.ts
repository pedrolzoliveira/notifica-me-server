import { CreatePlan } from '@application/dtos/create-plan.dto'
import { UpdatePlan } from '@application/dtos/update-plan.dto'
import { PlansRepository } from '@application/repositories/plans/plans.repository'
import { EventType, Plan, PrismaClient } from '@prisma/client'

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

  async findByQuery(q: string) {
    type queryResult = Plan & { EventType: EventType }
    const likeSearch = `%${q}%`
    const result = await this.db.$queryRaw<queryResult[]>`
    SELECT "Plan".*,
    "EventType"."code" "EventType.code",
    "EventType"."name" "EventType.name",
    "EventType"."description" "EventType.description",
    "EventType"."createdAt" "EventType.createdAt",
    "EventType"."updatedAt" "EventType.updatedAt"
    FROM "Plan"
    JOIN "_EventTypeToPlan"
    ON ("_EventTypeToPlan"."B" = "Plan"."id")
    JOIN "EventType"
    ON ("_EventTypeToPlan"."A" = "EventType"."code")    
    WHERE UPPER("Plan"."name") LIKE UPPER(${likeSearch})
    OR UPPER("Plan"."description") LIKE UPPER(${likeSearch})`
    return result.reduce((formatedPlans, currentPlan, index, arr) => {
      if (formatedPlans.some(v => v.id === currentPlan.id)) return formatedPlans
      const formatedcurrentPlan = {
        id: currentPlan.id,
        name: currentPlan.name,
        description: currentPlan.description,
        price: currentPlan.price,
        events: arr.reduce((formatedEvents, currentEvent) => {
          if (currentEvent.id === currentPlan.id) {
            const formatedEvent = {
              code: currentEvent['EventType.code'],
              name: currentEvent['EventType.name'],
              adminId: currentPlan.adminId,
              description: currentEvent['EventType.description'],
              createdAt: currentEvent['EventType.createdAt'],
              updatedAt: currentEvent['EventType.updatedAt']
            }
            formatedEvents.push(formatedEvent)
          }
          return formatedEvents
        }, []),
        createdAt: currentPlan.createdAt,
        updatedAt: currentPlan.updatedAt
      }
      formatedPlans.push(formatedcurrentPlan)
      return formatedPlans
    }, [])
  }

  async findAllByCustomer(customerId: string) {
    return await this.db.plan.findMany({ where: { customers: { some: { id: customerId } } } })
  }
}
