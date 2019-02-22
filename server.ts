import dotenv from 'dotenv'
import App from './app/App'

dotenv.load()
const app = new App(process.env.DB_URL || '')

app.express.listen(process.env.PORT)
