import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(req.headers.authorization || '', process.env.AUTH0_PRIVATE_KEY || '')
    req.context = { auth: decoded }
    next()
  } catch (err) {
    res.status(401).send('Unauthorized')
  }
}

export default checkUser
