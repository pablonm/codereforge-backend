import express from 'express'
import UserModel from './UserModel'
import IUser from './IUser'
import CheckUser from '../../Auth/CheckUser'
import IRefactoring from '../Refactoring/IRefactoring'

const router = express.Router()

/* Get all users */
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({})
      .populate('posts')
      .populate('refactorings')
    const processed = users.map(user => {
      return {
        ...user.toObject(),
        email: user.emailPublic ? user.toObject().email : null,
        score: Math.max(
          user
            .toObject()
            .refactorings.reduce((sum: number, elem: IRefactoring) => sum + elem.score, 0),
          0
        ),
      }
    })
    res.status(200).send(processed)
  } catch (err) {
    res.status(500).send(`There was a problem fetching users. Error: ${err}`)
  }
})

/* Get authenticated user */
router.get('/me', CheckUser, async (req, res) => {
  const auth = req.context!.auth as any
  try {
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
      .populate({ path: 'notifications' })
    if (!user) throw new Error('User not found')
    const processed = {
      ...user.toObject(),
      email: user.emailPublic ? user.toObject().email : null,
      score: Math.max(
        user
          .toObject()
          .refactorings.reduce((sum: number, elem: IRefactoring) => sum + elem.score, 0),
        0
      ),
    }
    res.status(200).send(processed)
  } catch (err) {
    res.status(500).send(`There was a problem fetching the user. Error: ${err}`)
  }
})

/* Get user by id */
router.get('/:userId', async (req, res) => {
  const { params } = req
  try {
    const user = await UserModel.findById(params.userId)
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
    if (!user) throw new Error('User not found')
    const processed = {
      ...user.toObject(),
      email: user.emailPublic ? user.toObject().email : null,
      score: Math.max(
        user
          .toObject()
          .refactorings.reduce((sum: number, elem: IRefactoring) => sum + elem.score, 0),
        0
      ),
    }
    res.status(200).send(processed)
  } catch (err) {
    res.status(500).send(`There was a problem fetching the user. Error: ${err}`)
  }
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

/* Read notifications */
router.put('/notifications', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const editedUser = await UserModel.findByIdAndUpdate(user._id, { unreadNotifications: false })
    res.status(200).send(editedUser)
  } catch (err) {
    res.status(500).send(`There was a problem updating the user. Error: ${err}`)
  }
})

export default router
