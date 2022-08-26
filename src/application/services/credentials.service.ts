import { CredentialsRepository } from "@application/repositories/credentials/credentials.repository";
import { PrismaClient } from "@prisma/client";
import { randomBytes } from "crypto";

class HasPermissionDTO {
    adminId: string;
    id: string;
}
export class CredentialsService {
    constructor(
        private credentialsRepository: CredentialsRepository,
        private db: PrismaClient,
    ) {}

    async create(data: { name: string; code: string, adminId: string }) {
        const key = await (new Promise<string>((resolve, reject) => {
            randomBytes(48, function(err, buffer) {
                if (err) reject(err);
                resolve(buffer.toString('hex'));
            });
        }));
        const credential = await this.credentialsRepository.create({
            name: data.name,
            eventCode: data.code,
            adminId: data.adminId,
            key
        });
        return credential;
    }

    async findAll(adminId: string) {
        return this.credentialsRepository.findAll(adminId);
    }

    async delete(id: string) {
        return this.credentialsRepository.delete(id);
    }

    async HasPermission(data: HasPermissionDTO) {
        const credential = await this.db.credential.findUnique({ select: { adminId: true }, where: { id: data.id } });
        return credential.adminId === data.adminId;
    }

}
