import { UnauthorizedError } from "@infra/http/errors/unauthorized-error";
import { Request, Response, NextFunction } from "express";

export function AuthMiddlaware(req: Request, res: Response, next: NextFunction) {
    if (!req.session.customer) {
        throw new UnauthorizedError("You need to be logged in to use this route");
    }
    next();
}
