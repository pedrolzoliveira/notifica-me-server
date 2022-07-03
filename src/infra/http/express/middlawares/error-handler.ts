import { Request, Response, NextFunction } from "express";

import { BaseError } from "@infra/http/errors/base-error";

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: "Internal Server Error" });
}
