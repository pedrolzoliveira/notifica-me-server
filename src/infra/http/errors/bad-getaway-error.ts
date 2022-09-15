import { BaseError } from './base-error'

export class BadGetawayError extends BaseError {
  constructor(message: string) {
    super(message, 502)
  }
}
