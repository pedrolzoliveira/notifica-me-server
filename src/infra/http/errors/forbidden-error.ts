import { BaseError } from './base-error'

export class ForbiddenError extends BaseError {
  constructor(message: string) {
    super(message, 403)
  }
}
