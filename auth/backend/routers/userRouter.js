import express from "express"
import { getAll, addUser } from "../controllers/userController.js"
const router = express.Router()

router.route("/get").get(getAll)
router.route("/add").post(addUser)

export default router
