import { useEffect, useState } from "react"
import useChat from "../store/useChat"
import toast from "react-hot-toast"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedChat } = useChat()

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true)
            try {
                const res = await fetch(`http://localhost:6600/api/message/${selectedChat?._id}`)
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error: any) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        if (selectedChat?._id) getMessages()
    }, [selectedChat?._id])

    return { messages, loading }
}

export default useGetMessages
