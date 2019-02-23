import mongoose from 'mongoose'
import ICodeFile from './ICodeFile'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'CodeFile',
  new Schema({
    id: ObjectId,
    file_name: { type: String, required: true },
    code: { type: String, required: true },
    language: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
  })
)

export default model<ICodeFile>('CodeFile')
