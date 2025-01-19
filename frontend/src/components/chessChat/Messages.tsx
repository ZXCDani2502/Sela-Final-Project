import { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/chat/useGetMessages'
import Message from './Message'
import useListenMessages from '../../hooks/chat/useListenMessages'

const Messages = () => {
    const { messages, loading } = useGetMessages()
    useListenMessages()
    const lastMessageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 50)
    }, [messages])

    return (
        <div className='px-4 flex-1 h-10 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
        </div>
    )
}

export default Messages
