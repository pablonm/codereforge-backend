import mongoose from 'mongoose'
import INotification from './INotification'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'Notification',
  new Schema({
    id: ObjectId,
    message: { type: String, required: true },
    postId: { type: ObjectId, ref: 'Post' },
    created_at: { type: Date, default: Date.now },
  })
)

export default model<INotification>('Notification')
