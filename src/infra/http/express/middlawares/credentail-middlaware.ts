import { ForbiddenError } from "@infra/http/errors/forbidden-error";
import { PrismaClient } from "@prisma/client";
import { Request, NextFunction, Response } from "express";


export class CredentialMiddlaware {
    constructor(
        private db: PrismaClient,
    ) {}

    async handler(req: Request, res: Response, next: NextFunction) {
        const credential = await this.db.credential.findFirst({ select: { eventCode: true },  where: { key: req.headers.authorization } });
        if (credential.eventCode === req.body.code) {
            next();
        } else {
            throw new ForbiddenError('Voce nao tem permissao');
        }
    }
}
