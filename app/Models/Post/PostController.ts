import express from 'express'
import PostModel from './PostModel'
import IPost from './IPost'

const router = express.Router()

/* Get all post */
router.get('/', (req, res) => {
  PostModel.find({})
    .then((posts: IPost[]) => res.status(200).send(posts))
    .catch(err => res.status(500).send(`There was a problem fetching posts. Error: ${err}`))
})

/* Create a new post */
router.post('/', (req, res) => {
  PostModel.create(req.body)
    .then((post: IPost) => res.status(201).send(post))
    .catch(err => res.status(500).send(`There was a problem creating the post. Error: ${err}`))
})

export default router
