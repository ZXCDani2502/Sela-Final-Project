import React, { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

const socket: Socket = io('http://localhost:6600') // Connect to the server

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([])
    const [input, setInput] = useState<string>('')

    useEffect(() => {
        // Listen for messages from the server
        socket.on('chatMessage', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg])
        })

        // Cleanup on component unmount
        return () => {
            socket.off('chatMessage')
        }
    }, [])

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit('chatMessage', input) // Send message to the server
            setInput('') // Clear input field
        }
    }

    return (
        <div>
            <div
                style={{
                    border: '1px solid #ccc',
                    padding: '1rem',
                    height: '300px',
                    overflowY: 'auto',
                    marginBottom: '1rem',
                }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ width: '80%', padding: '0.5rem', marginRight: '0.5rem' }}
                placeholder='Type your message...'
            />
            <button onClick={sendMessage} style={{ padding: '0.5rem' }}>
                Send
            </button>
        </div>
    )
}

export default Chat
