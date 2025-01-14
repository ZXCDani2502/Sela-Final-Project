import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routers/user.router.js'
import messageRouter from './routers/message.router.js'
import chessRouter from './routers/chess.router.js'
import { dbConnect } from './utils/dbConnect.js'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'

dotenv.config()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: 'http://localhost:6001' }))
app.use(cookieParser)

//Routing
app.use('/api/user/', userRouter)
app.use('/api/message/', messageRouter)
app.use('/api/chess/', chessRouter)

//DB Connection + Start Server
try {
	dbConnect(server)
} catch (e) {
	console.error(e)
}
