import { Request, Response, NextFunction } from "express";

import { BaseError } from "@infra/http/errors/base-error";

export function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof BaseError) {
        return res.status(err.statusCode).send({ error: err.message });
    }
    return res.status(500).send({ error: "Internal Server Error" });
}
