import Chat from "../models/chat.model.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

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

        const newMessage = new Message({ senderId, receiverId, message })
        if (newMessage) {
            chat.messages.push(newMessage)
        }

        //Socket.io logic here

        await Promise.all([chat.save(), newMessage.save()]) // saves will run in parallel

        res.status(201).json(`Message ${newMessage._id} sent`)
    } catch (error) {
        console.log("Error in sendMessage: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id

        const chat = await Chat.findOne({
            users: { $all: [senderId, receiverId] },
        }).populate("messages") //the actual messages

        if (!chat) {
            return res.status(404).json({ error: "No chat found" })
        }

        res.status(200).json(chat.messages)
    } catch (error) {
        console.log("Error in getMessages: ", error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}
