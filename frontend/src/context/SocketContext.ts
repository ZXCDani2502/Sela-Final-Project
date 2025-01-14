import { createContext, useContext } from "react"
import { Socket } from "socket.io-client"

type SocketContextType = {
    socket: Socket | null
    onlineUsers: unknown[]
}
export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error('useSocketContext must be used within SocketContextProvider')

    return context
}