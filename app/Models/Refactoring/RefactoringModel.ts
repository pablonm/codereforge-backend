import mongoose from 'mongoose'
import IRefactoring from './IRefactoring'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Refactoring',
  new Schema({
    id: ObjectId,
    author: { type: ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    post: { type: ObjectId, ref: 'Post', required: true },
    score: { type: Number, default: 0 },
    voters: [{ type: ObjectId, ref: 'User' }],
    code_files: [{ type: ObjectId, ref: 'CodeFile', required: true }],
    created_at: { type: Date, default: Date.now },
  })
)

export default model<IRefactoring>('Refactoring')
