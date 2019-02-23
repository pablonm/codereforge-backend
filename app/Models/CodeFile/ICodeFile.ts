import { Document } from 'mongoose'

export default interface ICodeFile extends Document {
  id: string
  file_name: string
  code: string
  language: string
  created_at: Date
}
