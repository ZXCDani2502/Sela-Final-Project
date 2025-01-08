import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routers/user.router.js"
import authRouter from "./routers/auth.router.js"
import messageRouter from "./routers/message.router.js"
import { dbConnect } from "./utils/dbConnect.js"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173" }))
app.use(cookieParser)

//Routing
app.use("/api/user/", userRouter)
app.use("/api/auth/", authRouter)
app.use("/api/message/", messageRouter)

//DB Connection + Start Server
try {
    dbConnect(app)
} catch (e) {
    console.error(e)
}
