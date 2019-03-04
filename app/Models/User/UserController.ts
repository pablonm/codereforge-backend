import express from 'express'
import UserModel from './UserModel'
import IUser from './IUser'
import CheckUser from '../../Auth/CheckUser'

const router = express.Router()

/* Get all users */
router.get('/', (req, res) => {
  UserModel.find({})
    .populate('posts')
    .then((users: IUser[]) => res.status(200).send(users))
    .catch(err => res.status(500).send(`There was a problem fetching users. Error: ${err}`))
})

/* Get authenticated user */
router.get('/me', CheckUser, async (req, res) => {
  const auth = req.context!.auth as any
  const user = await UserModel.findOne({ email: auth.email })
    .populate({
      path: 'posts',
      populate: {
        path: 'tags',
      },
    })
    .populate({
      path: 'refactorings',
      populate: {
        path: 'post',
        populate: {
          path: 'tags',
        },
      },
    })
  res.status(200).send(user)
})

/* Create a new user if doesn't exists */
router.post('/', CheckUser, async (req, res) => {
  const auth = req.context!.auth as any
  const user = await UserModel.findOne({ email: auth.email })
  if (!user) {
    UserModel.create({
      name: auth.name,
      picture: auth.picture,
      email: auth.email,
    })
      .then((newUser: IUser) => res.status(201).send(newUser))
      .catch(err => res.status(500).send(`There was a problem creating the user. Error: ${err}`))
  } else {
    res.status(200).send()
  }
})

/* Updates the user */
router.put('/', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const editedUser = await UserModel.findByIdAndUpdate(user._id, { ...body })
    res.status(200).send(editedUser)
  } catch (err) {
    res.status(500).send(`There was a problem updating the user. Error: ${err}`)
  }
})

export default router
