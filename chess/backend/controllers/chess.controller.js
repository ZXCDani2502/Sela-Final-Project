export const getGame = async (req, res) => {
    const chat = await Chat.findOne({
        users: {
            $all: [senderId, receiverId],
        },
    })

    if (!chat) {
        chat = await Chat.create({
            users: [senderId, receiverId],
        })
    }
}

export const sendMove = async (req, res) => {
    try {
        const { move } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const newMessage = new Message({ senderId, receiverId, message })
        if (newMessage) {
            chat.messages.push(newMessage)
        }

        await Promise.all([chat.save(), newMessage.save()]) // saves will run in parallel

        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(201).json(`Message ${newMessage._id} sent`)
    } catch (error) {
        console.log('Error in sendMessage: ', error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}
