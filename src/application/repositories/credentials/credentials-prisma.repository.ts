import { CreateCredentialDTO } from '@application/dtos/create-credential.dto'
import { Credential } from '@domain/credential.model'
import { PrismaClient } from '@prisma/client'
import { CredentialsRepository } from './credentials.repository'

export class CredentialPrismaRepository implements CredentialsRepository {
  constructor (
    private readonly prisma: PrismaClient
  ) {}

  async create(data: CreateCredentialDTO): Promise<Credential> {
    const credential = await this.prisma.credential.create({ data })
    return credential
  }

  async findAll(adminId: string): Promise<Credential[]> {
    return await this.prisma.credential.findMany({ where: { adminId } })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.credential.delete({ where: { id } })
  }
}
