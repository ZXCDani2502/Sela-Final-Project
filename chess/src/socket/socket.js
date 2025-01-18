import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Match from '../models/chess.model.js'
import { startMatch } from '../controllers/chess.controller.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: ['http://localhost:6001'],
		methods: ['GET', 'POST'],
	},
})

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId]
}

const userSocketMap = {}

const matchmakingQueue = []
let matchId = 0
io.on('connection', (socket) => {
	console.log('a user connected', socket.id)

	const { userId } = socket.handshake.query
	if (userId != 'undefined') {
		userSocketMap[userId] = socket.id
	}
	io.emit('getOnlineUsers', Object.keys(userSocketMap))
	socket.on('queue', async (userId) => {
		console.log(matchmakingQueue)
		if (matchmakingQueue.find((UserId) => UserId === userId)) {
			return
		}
		if (matchmakingQueue.length === 0) {
			matchmakingQueue.push(userId) //TODO add timeout for looking for a better match + loader
		} else {
			console.log(matchmakingQueue)
			const opponentId = matchmakingQueue.pop()
			console.log('opponent', opponentId)

			const match = new Match({ users: [userId, opponentId] })
			match.save()
			matchId = match._id
			const opponentSocket = io.sockets.sockets.get(userSocketMap[opponentId])
			socket.join(match._id)
			console.log(userSocketMap)
			if (opponentSocket) opponentSocket.join(match._id)
			else {
				matchmakingQueue.push(userId)
				return
			}
			startMatch(socket, match._id)
			// console.log(socket.rooms)
		}
	}),
		socket.on('move', (data) => {
			console.log(matchId)
			socket.to(matchId).emit('moveSet', data)
		}),
		socket.on('disconnect', () => {
			console.log('user disconnected', socket.id)
			delete userSocketMap[userId]
			delete matchmakingQueue[userId]
			io.emit('getOnlineUsers', Object.keys(userSocketMap))
		})
})

export { app, io, server }
