import { Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'
import fs from 'fs'

const cert = fs.readFileSync('codereforge.pem')

const checkUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(req.headers.authorization || '', cert)
    req.context = { auth: decoded }
    next()
  } catch (err) {
    res.status(401).send('Unauthorized')
  }
}

export default checkUser
