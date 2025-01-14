import express from 'express'
import protectRoute from '../middleware/protectRoute.js'
import { getGame, sendMove } from '../controllers/chess.controller.js'
const router = express.Router()

router.get('/:id', protectRoute, getGame)
router.post('/send', protectRoute, sendMove)

export default router
