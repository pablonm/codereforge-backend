import { Document } from 'mongoose'

export default interface INotification extends Document {
  id: string
  message: string
  postId: string
  created_at: Date
}
