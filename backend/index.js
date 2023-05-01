import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json());
app.use(cors())
app.use(express.json({limit: '50mb'}))

app.use('/api/post',postRoutes)
app.use('/api/dalle',dalleRoutes)

app.get('/',async (req,res) => {
    res.send("Hello From DALL-E")
})

try {
    connectDB(process.env.MONGODB_URL)
    app.listen(8000,()=> console.log('Server has started on http://localhost:8000'))
} catch (error) {
    console.log(error)
}

