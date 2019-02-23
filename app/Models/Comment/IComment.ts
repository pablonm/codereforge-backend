import { Document } from 'mongoose'

export default interface IComment extends Document {
  id: string
  comment: string
  author: string
  score: number
  voters?: string[]
  parent?: string
  created_at: Date
}
