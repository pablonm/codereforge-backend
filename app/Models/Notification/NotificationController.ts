import express from 'express'
import UserModel from '../User/UserModel'
import NotificationModel from './NotificationModel'
import CheckUser from '../../Auth/CheckUser'

const router = express.Router()

/* Get all notifications */
router.get('/', CheckUser, async (req, res) => {
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('User not found')
    const notifications = await NotificationModel.find({})
    res.status(200).send(notifications)
  } catch (err) {
    res.status(500).send(`There was a problem fetching notifications. Error: ${err}`)
  }
})

export default router
