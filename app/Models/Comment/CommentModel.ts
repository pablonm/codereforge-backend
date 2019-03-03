import mongoose from 'mongoose'
import IComment from './IComment'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Comment',
  new Schema({
    id: ObjectId,
    content: { type: String, required: true },
    author: { type: ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
  })
)

export default model<IComment>('Comment')
