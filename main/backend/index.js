import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRouter from "./routers/user.router.js"
import { dbConnect } from "./utils/dbConnect.js"
dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: "http://localhost:5173" }))

//Routing
app.use("/api/v1/", userRouter)

//DB Connection + Start Server
try {
	dbConnect(app)
} catch (e) {
	console.error(e)
}
