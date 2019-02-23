import express from 'express'
import RefactoringModel from './RefactoringModel'
import IRefactoring from './IRefactoring'

const router = express.Router()

/* Get all refactorings */
router.get('/', (req, res) => {
  RefactoringModel.find({})
    .then((refactorings: IRefactoring[]) => res.status(200).send(refactorings))
    .catch(err => res.status(500).send(`There was a problem fetching refactorings. Error: ${err}`))
})

/* Create a new refactoring */
router.post('/', (req, res) => {
  RefactoringModel.create(req.body)
    .then((refactoring: IRefactoring) => res.status(201).send(refactoring))
    .catch(err =>
      res.status(500).send(`There was a problem creating the refactoring. Error: ${err}`)
    )
})

export default router
