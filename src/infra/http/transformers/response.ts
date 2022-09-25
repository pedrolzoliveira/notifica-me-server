import { Response } from '@interfaces/response'

interface transformResponseParams {
  payload?: any
  errors?: any[]
  message?: string
}

export const transformResponse = (res: transformResponseParams = {}): Response => ({
  ...res,
  ok: !res.errors?.length
})
