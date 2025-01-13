import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Match from '../models/chess.model.js'
import { startMatch } from '../controllers/chess.controller.js'
import { match } from 'assert'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:6601'],
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
    const { userId } = socket.handshake.query
    console.log('a user connected', socket.id)
    const currentMatches = Match.find().where("users",userId)
    console.log(currentMatches);
    // console.log('match - ', availableMatch)
    // if (currentMatch) {
    //     socket.join(currentMatch._id)
    //         const LastGameState = currentMatch.game
    //         setTimeout(() => {}, 1000)
    //         try {
    //             console.log(LastGameState)
    //             console.log('lastGameState - ', lastMove)
    //             socket.emit('updateBoard', lastMove)
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    
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
        socket.on('move', ({ game, matchId }) => {
            Match.findById(matchId).then((match) => {
                match.game.push(game)
                match.save()
                console.log(match)
                socket.broadcast.emit('updateBoard', game)
            })
        }),
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id)
            delete userSocketMap[userId]
            delete matchmakingQueue[userId]
            io.emit('getOnlineUsers', Object.keys(userSocketMap))
        })
    socket.on('gameOver', (matchId) => {
        delete currentMatches[matchId]
    })
})

export { app, io, server }
