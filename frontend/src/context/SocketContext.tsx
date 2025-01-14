import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useAuthStore } from '../store/useAuthStore'

type SocketContextType = {
    socket: Socket | null
    onlineUsers: any[]
}

export const SocketContext = createContext<SocketContextType | null>(null)

export const useSocketContext = () => {
    const context = useContext(SocketContext)
    if (!context) throw new Error('useSocketContext must be used within SocketContextProvider')

    return context
}

export const SocketContextProvider = ({ children }: { children: React.ReactElement }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const { authUser } = useAuthStore()

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:6600', {
                query: {
                    userId: authUser._id,
                },
            })
            setSocket(socket)

            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users)
            })

            return () => {
                socket.close()
            }
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>
}
