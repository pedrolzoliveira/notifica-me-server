import { Request, Response, NextFunction } from 'express'
import { BaseError } from '@infra/http/errors/base-error'
import { transformResponse } from '@infra/http/transformers/response'

export function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).send(
      transformResponse({
        errors: [error],
        message: error.message
      })
    )
  }
  return res.status(500).send(
    transformResponse({
      errors: [error],
      message: 'Internal Server Error'
    })
  )
}
