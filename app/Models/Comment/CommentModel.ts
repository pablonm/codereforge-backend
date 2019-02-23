import mongoose from 'mongoose'
import IComment from './IComment'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Comment',
  new Schema({
    id: ObjectId,
    comment: { type: String, required: true },
    author: { type: ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    voters: [{ type: ObjectId, ref: 'User' }],
    parent: { type: ObjectId, ref: 'Comment' },
    created_at: { type: Date, default: Date.now },
  })
)

export default model<IComment>('Comment')
