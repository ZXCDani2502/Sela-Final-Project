import { useState } from 'react'
import useChat from '../../store/useChat.ts'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, currentChat: selectedChat } = useChat()
    //TODO get selected chat

    const sendMessage = async (message: string) => {
        setLoading(true)
        try {
            const res = await fetch(`http://localhost:6600/api/message/send/${selectedChat?._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
            const data = await res.json()
            if (data.error) throw new Error(data.error)

            setMessages([...messages, data.message])
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage
