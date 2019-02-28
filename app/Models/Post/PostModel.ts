import mongoose from 'mongoose'
import IPost from './IPost'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Post',
  new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    author: { type: ObjectId, ref: 'User', required: true },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    description: { type: String, required: true },
    refactorings: [{ type: ObjectId, ref: 'Refactoring' }],
    code_files: [{ type: ObjectId, ref: 'CodeFile', required: true }],
    tags: [{ type: ObjectId, ref: 'Tag', required: true }],
    created_at: { type: Date, default: Date.now },
  })
)

export default model<IPost>('Post')
