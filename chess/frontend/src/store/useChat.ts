import { create } from 'zustand'

export type User = {
    _id: string
    username: string
}

export type Message = {
    _id: string
    senderId: string
    receiverId: string
    message: string
    createdAt: string
}

export type Chat = {
    _id: string
    users: Array<User>
    messages: Array<Message>
}

interface ChatState {
    selectedChat: Chat | null
    setSelectedChat: (selectedChat: Chat) => void
    messages: Array<Message>
    setMessages: (messages: Array<Message>) => void
}

const useChat = create<ChatState>((set) => ({
    //TODO find where to create the chat
    selectedChat: null,
    setSelectedChat: (selectedChat) => set({ selectedChat }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useChat
