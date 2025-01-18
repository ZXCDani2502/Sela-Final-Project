export const startMatch = (socket, matchId) => {
    if (Math.random() <= 0.5) {
        socket.emit('matchFound', { color: 'w', matchId })
        socket.broadcast.emit('matchFound', { color: 'b', matchId })
    } else {
        socket.emit('matchFound', { color: 'b', matchId })
        socket.broadcast.emit('matchFound', { color: 'w', matchId })
    }
}

export const getGame = async (req, res) => {
    try {
        // const { id: receiverId } = req.params
        // const senderId = req.user._id
        // res.status(200).json(match.game)
    } catch (error) {
        console.log('Error in getGame: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const sendMove = async (req, res) => {
    try {
        const { move } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const newMove = new Move({ senderId, receiverId, message })
        if (newMove) {
            chat.messages.push(newMove)
        }

        await Promise.all([chat.save(), newMove.save()]) // saves will run in parallel

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMove)
        }

        res.status(201).json(`Message ${newMove._id} sent`)
    } catch (error) {
        console.log('Error in sendMove: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}
