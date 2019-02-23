import dotenv from 'dotenv'
import App from './app/App'

dotenv.load()
const app = new App()

app.express.listen(process.env.PORT)
