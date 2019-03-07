import express from 'express'
import CommentModel from './CommentModel'
import IComment from './IComment'
import CheckUser from '../../Auth/CheckUser'
import UserModel from '../User/UserModel'
import PostModel from '../Post/PostModel'
import RefactoringModel from '../Refactoring/RefactoringModel'
import NotificationModel from '../Notification/NotificationModel'

const router = express.Router()

/* Get all comments */
router.get('/', (req, res) => {
  CommentModel.find({})
    .then((comments: IComment[]) => res.status(200).send(comments))
    .catch(err => res.status(500).send(`There was a problem fetching comments. Error: ${err}`))
})

/* Create a new comment for a post */
router.post('/post', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const post = await PostModel.findById(body.postId)
    if (!post) throw new Error('There is no post with that id')
    if (String(user._id) !== String(post.author)) {
      const author = await UserModel.findById(post.author)
      if (!author) throw new Error('Author user not found')
      const notification = await NotificationModel.create({
        message: `${user.name} posted a comment in ${post.name}`,
        postId: post._id,
      })
      author.unreadNotifications = true
      author.notifications.push(notification._id)
      author.save()
    }
    let comment = await CommentModel.create({
      content: body.content,
      author: user._id,
    })
    user.comments.push(comment._id)
    user.save()
    post.comments.push(comment._id)
    post.save()
    comment = await CommentModel.populate(comment, { path: 'author' })
    res.status(201).send(comment)
  } catch (err) {
    res.status(500).send(`There was a problem creating the comment. Error: ${err}`)
  }
})

/* Create a new comment for a refactoring */
router.post('/refactoring', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const refactoring = await RefactoringModel.findById(body.refactoringId)
    if (!refactoring) throw new Error('There is no refactoring with that id')
    if (String(user._id) !== String(refactoring.author)) {
      const author = await UserModel.findById(refactoring.author)
      if (!author) throw new Error('Author user not found')
      const notification = await NotificationModel.create({
        message: `${user.name} posted a comment in your refactoring`,
        postId: refactoring.post,
      })
      author.unreadNotifications = true
      author.notifications.push(notification._id)
      author.save()
    }
    let comment = await CommentModel.create({
      content: body.content,
      author: user._id,
    })
    user.comments.push(comment._id)
    user.save()
    refactoring.comments.push(comment._id)
    refactoring.save()
    comment = await CommentModel.populate(comment, { path: 'author' })
    res.status(201).send(comment)
  } catch (err) {
    res.status(500).send(`There was a problem creating the comment. Error: ${err}`)
  }
})

export default router
