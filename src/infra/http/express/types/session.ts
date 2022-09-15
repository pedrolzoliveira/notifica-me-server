import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    customer: {
      id: string
      email: string
      name: string
    }
    admin: {
      id: string
      email: string
      name: string
    }
  }
}
