import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            default: [],
        }
    ]
}, {timestamps: true})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat