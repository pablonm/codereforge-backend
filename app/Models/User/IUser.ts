import { Document } from 'mongoose'

export default interface IUser extends Document {
  id: string
  name: string
  picture: string
  email: string
  emailPublic: boolean
  profession: string
  github: string
  linkedin: string
  comments: string[]
  posts: string[]
  refactorings: string[]
  notifications: string[]
  unreadNotifications: boolean
  created_at: Date
}
