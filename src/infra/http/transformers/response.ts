import { Response } from '@interfaces/response'

interface transformResponseParams {
  data?: any
  errors?: any[]
  message?: string
}

export const transformResponse = (req: transformResponseParams = {}): Response => ({
  ...req,
  ok: !req.errors?.length
})
