import { CreateCredentialDTO } from "@application/dtos/create-credential.dto";
import { Credential } from "@domain/credential.model";
import { PrismaClient } from "@prisma/client";
import { CredentialRepository } from "./credentials.repository";
import { randomBytes } from "crypto";

export class CredentialPrismaRepository implements CredentialRepository {

    constructor (
        private prisma: PrismaClient
    ) {}

    async create(data: CreateCredentialDTO): Promise<Credential> {
        const key = await (new Promise<string>((resolve, reject) => {
            randomBytes(48, function(err, buffer) {
                if (err) reject(err);
                resolve(buffer.toString('hex'));
            });
        }));
        
        const credential = await this.prisma.credential.create({ data: {
            name: data.name,
            eventCode: data.code,
            key
        } });

        return credential;
    }
    async findAll(): Promise<Credential[]> {
        return this.prisma.credential.findMany({});
    }

    async delete(id: string): Promise<void> {
        this.prisma.credential.delete({ where: { id } });
    }
}
