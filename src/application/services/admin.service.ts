import { PrismaClient } from '@prisma/client'

class createDTO {
  name: string
  email: string
  passwordHash: string
}

export class AdminService {
  constructor(
    private readonly db: PrismaClient
  ) {}

  create(data: createDTO) {
    return this.db.admin.create({ data })
  }

  findByEmail(email: string) {
    return this.db.admin.findUnique({ where: { email } })
  }
}
