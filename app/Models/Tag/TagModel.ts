import mongoose from 'mongoose'
import ITag from './ITag'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Tag',
  new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    posts: [{ type: ObjectId, ref: 'Post' }],
    created_at: { type: Date, default: Date.now },
  })
)

export default model<ITag>('Tag')
