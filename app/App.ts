import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

class App {
  public express: express.Application

  constructor(dbUrl: string) {
    mongoose.connect(dbUrl, { useNewUrlParser: true })
    this.express = express()
    this.config()
    this.routes()
  }

  private config(): void {
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {
    this.express.get('/', (req, res) => {
      res.send('hello world')
    })
  }
}

export default App
