import express from 'express'
import TagModel from './TagModel'
import ITag from './ITag'
import CheckUser from '../../Auth/CheckUser'

const router = express.Router()

/* Get all tags */
router.get('/', (req, res) => {
  TagModel.find({})
    .then((tags: ITag[]) => res.status(200).send(tags))
    .catch(err => res.status(500).send(`There was a problem fetching tags. Error: ${err}`))
})

/* Create a new tag */
router.post('/', CheckUser, (req: express.Request, res: express.Response) => {
  TagModel.create(req.body)
    .then((tag: ITag) => res.status(201).send(tag))
    .catch(err => res.status(500).send(`There was a problem creating the tag. Error: ${err}`))
})

export default router
