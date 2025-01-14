import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { dbConnect } from './utils/dbConnect.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: ['http://localhost:6600', 'http://localhost:6601'],
        credentials: true,
    })
)

app.use('/api/auth', authRoutes)

dbConnect(app)
