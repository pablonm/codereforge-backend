import express from 'express'
import TagModel from './TagModel'
import ITag from './ITag'
// import CheckUser from '../../Auth/CheckUser'

const router = express.Router()

/* Get all tags */
router.get('/', (req, res) => {
  TagModel.find({})
    .then((tags: ITag[]) => res.status(200).send(tags))
    .catch(err => res.status(500).send(`There was a problem fetching tags. Error: ${err}`))
})

/* Create a new tag */
/* router.post('/', CheckUser, (req: express.Request, res: express.Response) => {
  TagModel.create(req.body)
    .then((tag: ITag) => res.status(201).send(tag))
    .catch(err => res.status(500).send(`There was a problem creating the tag. Error: ${err}`))
}) */

/* Seed */
router.post('/seed', (req: express.Request, res: express.Response) => {
  TagModel.create([
    { name: 'javascript' },
    { name: 'java' },
    { name: 'c#' },
    { name: 'php' },
    { name: 'android' },
    { name: 'python' },
    { name: 'jquery' },
    { name: 'html' },
    { name: 'c++' },
    { name: 'ios' },
    { name: 'css' },
    { name: 'mysql' },
    { name: 'sql' },
    { name: 'asp.net' },
    { name: 'ruby-on-rails' },
    { name: 'c' },
    { name: 'objective-c' },
    { name: '.net' },
    { name: 'r' },
    { name: 'node' },
    { name: 'sql-server' },
    { name: 'swift' },
    { name: 'regex' },
    { name: 'ruby' },
    { name: 'ajax' },
    { name: 'django' },
    { name: 'xml' },
    { name: 'linux' },
    { name: 'angular' },
    { name: 'spring' },
    { name: 'wordpress' },
    { name: 'react' },
    { name: 'vb' },
    { name: 'html5' },
    { name: 'mongodb' },
    { name: 'laravel' },
    { name: 'bash' },
    { name: 'git' },
    { name: 'pandas' },
    { name: 'postgresql' },
    { name: 'bootstrap' },
    { name: 'algorithm' },
    { name: 'scala' },
    { name: 'apache' },
    { name: 'matlab' },
    { name: 'performance' },
    { name: 'css3' },
    { name: 'entity-framework' },
    { name: 'hibernate' },
    { name: 'typescript' },
    { name: 'linq' },
    { name: 'swing' },
    { name: 'amazon-web-services' },
    { name: 'shell' },
    { name: 'azure' },
    { name: 'firebase' },
    { name: 'api' },
    { name: 'maven' },
    { name: 'powershell' },
    { name: '.htaccess' },
    { name: 'sqlite' },
    { name: 'codeigniter' },
    { name: 'unit-testing' },
    { name: 'perl' },
    { name: 'symfony' },
    { name: 'selenium' },
    { name: 'google-maps' },
    { name: 'cordova' },
    { name: 'numpy' },
    { name: 'docker' },
    { name: 'xaml' },
    { name: 'express' },
    { name: 'opencv' },
    { name: 'apache-spark' },
    { name: 'react-native' },
    { name: 'oop' },
    { name: 'batch-file' },
    { name: 'delphi' },
    { name: 'haskell' },
    { name: 'unity3d' },
    { name: 'tensorflow' },
    { name: 'matplotlib' },
    { name: 'go' },
    { name: 'xamarin' },
    { name: 'nginx' },
    { name: 'ionic-framework' },
    { name: 'd3' },
    { name: 'opengl' },
    { name: 'dom' },
    { name: 'laravel' },
    { name: 'vue' },
    { name: 'assembly' },
    { name: 'cakephp' },
    { name: 'stored-procedures' },
    { name: 'meteor' },
    { name: 'optimization' },
    { name: 'razor' },
    { name: 'amazon-s3' },
    { name: 'flask' },
    { name: 'webpack' },
    { name: 'mongoose' },
    { name: 'ember' },
    { name: 'data-structures' },
    { name: 'groovy' },
    { name: 'ssh' },
    { name: 'lambda' },
    { name: 'database-design' },
    { name: 'backbone' },
    { name: 'kotlin' },
    { name: 'knockout' },
    { name: 'woocommerce' },
    { name: 'drupal' },
    { name: 'makefile' },
  ])
  res.status(200).send()
})

export default router
