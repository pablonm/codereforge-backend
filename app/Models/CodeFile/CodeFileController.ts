import express from 'express'
import CodeFileModel from './CodeFileModel'
import ICodeFile from './ICodeFile'

const router = express.Router()

/* Get all codefiles */
router.get('/', (req, res) => {
  CodeFileModel.find({})
    .then((codefiles: ICodeFile[]) => res.status(200).send(codefiles))
    .catch(err => res.status(500).send(`There was a problem fetching codefiles. Error: ${err}`))
})

/* Create a new codefile */
router.post('/', (req, res) => {
  CodeFileModel.create(req.body)
    .then((codefile: ICodeFile) => res.status(201).send(codefile))
    .catch(err => res.status(500).send(`There was a problem creating the codefile. Error: ${err}`))
})

export default router
