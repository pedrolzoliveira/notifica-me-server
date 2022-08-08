import { Credential } from "@domain/credential.model";
import { CreateCredentialDTO } from "@application/dtos/create-credential.dto";

export interface CredentialsRepository {
    create(data: CreateCredentialDTO): Promise<Credential>;
    findAll(): Promise<Credential[]>;
    delete(id: string): Promise<void>;
}