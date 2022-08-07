import { Credential } from "@domain/credential.model";
import { CreateCredentialDTO } from "@application/dtos/create-credential.dto";

export interface CredentialRepository {
    create(data: CreateCredentialDTO): Promise<Credential>;
    findAll(): Promise<Credential[]>;
    delete(id: string): Promise<void>;
}