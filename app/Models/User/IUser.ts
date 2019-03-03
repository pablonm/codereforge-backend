import { Document } from 'mongoose'

export default interface IUser extends Document {
  id: string
  name: string
  picture: string
  email: string
  comments: string[]
  posts: string[]
  refactorings: string[]
  created_at: Date
}
