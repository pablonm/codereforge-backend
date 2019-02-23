interface IContext {
  auth: string | object
}

declare namespace Express {
  export interface Request {
    context?: IContext
  }
}
