import { Document } from 'mongoose'

export default interface IRefactoring extends Document {
  id: string
  author: string
  comments?: string[]
  post: string
  score: number
  voters?: string[]
  code_files: string[]
  created_at: Date
}
