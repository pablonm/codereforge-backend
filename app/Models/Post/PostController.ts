import express from 'express'
import PostModel from './PostModel'
import CodeFileModel from '../CodeFile/CodeFileModel'
import UserModel from '../User/UserModel'
import IPost from './IPost'
import CheckUser from '../../Auth/CheckUser'

const router = express.Router()

/* Get all post */
router.get('/', (req, res) => {
  PostModel.find({})
    .populate('tags')
    .then((posts: IPost[]) => res.status(200).send(posts))
    .catch(err => res.status(500).send(`There was a problem fetching posts. Error: ${err}`))
})

/* Get post by id */
router.get('/:postId', (req, res) => {
  const { postId } = req.params
  PostModel.findById(postId)
    .populate('tags')
    .populate('author')
    .populate('code_files')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
      },
    })
    .populate({
      path: 'refactorings',
      populate: [
        {
          path: 'comments',
          populate: {
            path: 'author',
          },
        },
        {
          path: 'author',
        },
        {
          path: 'code_files',
        },
      ],
    })
    .then((post: IPost | null) => res.status(200).send(post))
    .catch(err => res.status(500).send(`There was a problem fetching posts. Error: ${err}`))
})

/* Create a new post */
router.post('/', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const codeFile = await CodeFileModel.create({
      file_name: 'CodeFile',
      code: body.codeFiles[0],
      language: body.language,
    })
    const post = await PostModel.create({
      name: body.name,
      author: user._id,
      description: body.description,
      code_files: [codeFile._id],
      tags: body.tags,
    })
    user.posts.push(post._id)
    user.save()
    res.status(201).send(post)
  } catch (err) {
    res.status(500).send(`There was a problem creating the post. Error: ${err}`)
  }
})

export default router
