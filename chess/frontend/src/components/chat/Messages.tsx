import { useEffect, useRef } from 'react'
import useGetMessages from '../../hooks/useGetMessages'
import Message from './Message'
import useListenMessages from '../../hooks/useListenMessages'

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
        <div className='px-4 flex-1 overflow-auto'>
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}

            {!loading && messages.length === 0 && <p className='text-center'>Send a message</p>}
        </div>
    )
}

export default Messages
