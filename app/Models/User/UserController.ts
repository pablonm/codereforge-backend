import express from 'express'
import UserModel from './UserModel'
import IUser from './IUser'

const router = express.Router()

/* Get all users */
router.get('/', (req, res) => {
  UserModel.find({})
    .then((users: IUser[]) => res.status(200).send(users))
    .catch(err => res.status(500).send(`There was a problem fetching users. Error: ${err}`))
})

/* Create a new user */
router.post('/', (req, res) => {
  UserModel.create(req.body)
    .then((user: IUser) => res.status(201).send(user))
    .catch(err => res.status(500).send(`There was a problem creating the user. Error: ${err}`))
})

export default router
