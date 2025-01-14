import express from "express"
import { getUsersForChat } from "../controllers/user.controller.js"
import protectRoute from "../middleware/protectRoute.js"
const router = express.Router()

router.get("/", protectRoute, getUsersForChat)

// router.get("/get", getAll)
// router.post("/add", addUser)

export default router
