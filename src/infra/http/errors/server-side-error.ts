import { BaseError } from "./base-error";

export class ServerSideError extends BaseError {
    constructor(message: string) {
        super(message, 500);
    }
}