import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

import CodeFileController from './Models/CodeFile/CodeFileController'
import CommentController from './Models/Comment/CommentController'
import PostController from './Models/Post/PostController'
import RefactoringController from './Models/Refactoring/RefactoringController'
import TagController from './Models/Tag/TagController'
import UserController from './Models/User/UserController'

class App {
  console.log('hi')
  public express: express.Application

  constructor() {
    mongoose.connect(process.env.DB_URL || '', { useNewUrlParser: true })
    this.express = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {
    this.express.use('/codefiles', CodeFileController)
    this.express.use('/comments', CommentController)
    this.express.use('/posts', PostController)
    this.express.use('/refactorings', RefactoringController)
    this.express.use('/tags', TagController)
    this.express.use('/users', UserController)
  }
}

export default App