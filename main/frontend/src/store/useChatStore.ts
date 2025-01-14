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
    currentChat: Chat | null
    setCurrentChat: (currentChat: Chat) => void
    messages: Array<Message>
    setMessages: (messages: Array<Message>) => void
}

const useChat = create<ChatState>((set) => ({
    //TODO find where to create the chat
    currentChat: null,
    setCurrentChat: (currentChat) => set({ currentChat }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useChat
