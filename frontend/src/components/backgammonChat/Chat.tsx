import { Button, Heading, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Message } from './Message'
import { ChatProps } from '../../types.ts'
import { CloseButton } from './ui/close-button.tsx'

export const Chat: React.FC<ChatProps> = ({ messages, chatRoom, sendMessage, closeChat }) => {
    const [message, setMessage] = useState<string>('')
    const messagesEndRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
    }, [messages])

    const onSendMessage = (): void => {
        sendMessage(message)
        setMessage('')
    }

    return (
        <div className='w-1/2 bg-white p-8 rounded shadow-lg'>
            <div className='flex flex-row justify-between mb-5'>
                <Heading size='lg'>{chatRoom}</Heading>
                <CloseButton onClick={closeChat} />
            </div>

            <div className='flex flex-col overflow-auto scroll-smooth h-96 gap-3 pb-3'>
                {messages.map((messageInfo, index) => (
                    <Message messageInfo={messageInfo} key={index} />
                ))}
                <span ref={messagesEndRef} />
            </div>

            <div className='flex gap-3'>
                <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Write Your Message' />
                <Button colorScheme='blue' onClick={onSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    )
}
