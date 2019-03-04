import mongoose from 'mongoose'
import IUser from './IUser'

const { Schema, model } = mongoose
const { ObjectId } = mongoose.Schema.Types

mongoose.model(
  'User',
  new Schema({
    id: ObjectId,
    name: { type: String, required: true },
    picture: { type: String },
    email: { type: String, unique: true, required: true },
    emailPublic: { type: Boolean, default: false },
    profession: { type: String },
    github: { type: String },
    linkedin: { type: String },
    comments: [{ type: ObjectId, ref: 'Comment' }],
    posts: [{ type: ObjectId, ref: 'Post' }],
    refactorings: [{ type: ObjectId, ref: 'Refactoring' }],
    created_at: { type: Date, default: Date.now },
  })
)

export default model<IUser>('User')
