import express from 'express'
import RefactoringModel from './RefactoringModel'
import IRefactoring from './IRefactoring'
import CheckUser from '../../Auth/CheckUser'
import UserModel from '../User/UserModel'
import PostModel from '../Post/PostModel'
import CodeFileModel from '../CodeFile/CodeFileModel'

const router = express.Router()

/* Get all refactorings */
router.get('/', (req, res) => {
  RefactoringModel.find({})
    .then((refactorings: IRefactoring[]) => res.status(200).send(refactorings))
    .catch(err => res.status(500).send(`There was a problem fetching refactorings. Error: ${err}`))
})

/* Create a new refactoring */
router.post('/', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const post = await PostModel.findById(body.postId)
    if (!post) throw new Error('There is no post with that id')
    const codeFile = await CodeFileModel.create({
      file_name: 'CodeFile',
      code: body.codeFiles[0],
      language: body.language,
    })
    let refactoring = await RefactoringModel.create({
      author: user._id,
      description: body.description,
      post: post._id,
      code_files: [codeFile._id],
    })
    user.refactorings.push(refactoring._id)
    user.save()
    post.refactorings.push(refactoring._id)
    post.save()
    refactoring = await RefactoringModel.populate(refactoring, [
      { path: 'author' },
      { path: 'code_files' },
    ])
    res.status(201).send(refactoring)
  } catch (err) {
    res.status(500).send(`There was a problem creating the refactoring. Error: ${err}`)
  }
})

/* Vote for a refactoring */
router.post('/vote', CheckUser, async (req, res) => {
  const { body } = req
  const auth = req.context!.auth as any
  try {
    const user = await UserModel.findOne({ email: auth.email })
    if (!user) throw new Error('There is no user with that email')
    const refactoring = await RefactoringModel.findById(body.refactoringId)
    if (!refactoring) throw new Error('There is no refactoring with that id')
    if (
      refactoring.voters.some(voter => {
        return String(voter) === String(user._id)
      })
    ) {
      throw new Error('You already voted for this refactoring')
    }
    if (String(refactoring.author) === String(user._id)) {
      throw new Error("You can't vote your own refactoring")
    }
    if (Math.abs(body.vote) > 1) throw new Error('You can only give one vote')
    refactoring.voters.push(user._id)
    refactoring.score += body.vote
    refactoring.save()
    res.status(200).send()
  } catch (err) {
    res.status(500).send(`There was a problem voting for the refactoring. Error: ${err}`)
  }
})

export default router
