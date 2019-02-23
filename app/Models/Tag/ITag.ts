import { Document } from 'mongoose'

export default interface ITag extends Document {
  id: string
  name: string
  posts?: string[]
  created_at: Date
}
