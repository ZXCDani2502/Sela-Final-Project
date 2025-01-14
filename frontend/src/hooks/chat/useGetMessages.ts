import { useEffect, useState } from 'react'
import useChat from '../../store/useChatStore'
import toast from 'react-hot-toast'

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, currentChat } = useChat()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`http://localhost:6600/api/message/${currentChat?._id}`)
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (currentChat?._id) getMessages()
    }, [currentChat?._id])

    return { messages, loading }
}

export default useGetMessages
