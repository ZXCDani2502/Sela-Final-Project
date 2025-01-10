import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useChat from '../store/useChat'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useChat()

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            setMessages([...messages, newMessage])
        })

        // will activate for every connected user if not for this
        return () => {
            socket?.off('newMessage')
        }
    }, [socket, setMessages, messages])
}

export default useListenMessages
