import { CredentialsRepository } from "@application/repositories/credentials/credentials.repository";
import { randomBytes } from "crypto";

export class CredentialsService {
    constructor(
        private credentialsRepository: CredentialsRepository
    ) {}

    async create(data: { name: string; code: string }) {
        const key = await (new Promise<string>((resolve, reject) => {
            randomBytes(48, function(err, buffer) {
                if (err) reject(err);
                resolve(buffer.toString('hex'));
            });
        }));
        const credential = await this.credentialsRepository.create({
            name: data.name,
            eventCode: data.code,
            key
        });
        return credential;
    }

    async findAll() {
        return this.credentialsRepository.findAll();
    }

    async delete(id: string) {
        return this.credentialsRepository.delete(id);
    }


}
