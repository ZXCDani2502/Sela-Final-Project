import { useState } from 'react'
import useChat from '../../store/useChatStore.ts'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, currentChat: selectedChat} = useChat()
    //TODO get selected chat
    const sendMessage = async (message: string) => {
        setLoading(true)
        try {
            const {data} = await axios.post(`http://localhost:6600/api/message/send/${selectedChat?._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            })
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
