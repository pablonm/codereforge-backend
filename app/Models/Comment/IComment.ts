import { Document } from 'mongoose'

export default interface IComment extends Document {
  id: string
  content: string
  author: string
  created_at: Date
}
