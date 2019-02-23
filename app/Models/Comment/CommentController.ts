import express from 'express'
import CommentModel from './CommentModel'
import IComment from './IComment'

const router = express.Router()

/* Get all comments */
router.get('/', (req, res) => {
  CommentModel.find({})
    .then((comments: IComment[]) => res.status(200).send(comments))
    .catch(err => res.status(500).send(`There was a problem fetching comments. Error: ${err}`))
})

/* Create a new comment */
router.post('/', (req, res) => {
  CommentModel.create(req.body)
    .then((comment: IComment) => res.status(201).send(comment))
    .catch(err => res.status(500).send(`There was a problem creating the comment. Error: ${err}`))
})

export default router
