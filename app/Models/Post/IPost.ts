import { Document } from 'mongoose'

export default interface IPost extends Document {
  id: string
  name: string
  author: string
  description: string
  comments: string[]
  refactorings: string[]
  code_files: string[]
  tags: string[]
  created_at: Date
}
