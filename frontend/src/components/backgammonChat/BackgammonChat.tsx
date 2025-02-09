import { useState } from 'react'
import { WaitingRoom } from './WaitingRoom.tsx'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import { Chat } from './Chat.tsx'
import { MessageInfo } from '../../types.ts'

interface ChatUser {
    userName: string
    chatRoom: string
}

export const App: React.FC = () => {
    const [connection, setConnection] = useState<HubConnection | null>(null)
    const [messages, setMessages] = useState<MessageInfo[]>([])
    const [chatRoom, setChatRoom] = useState<string>('')

    const joinChat = async (userName: string, chatRoom: string): Promise<void> => {
        const connection = new HubConnectionBuilder().withUrl('https://localhost:7022/chat').withAutomaticReconnect().build()

        connection.on('ReceiveMessage', (userName: string, message: string) => {
            setMessages((messages) => [...messages, { userName, message }])
        })

        try {
            await connection.start()
            if (isEmptyOrSpaces(userName) || isEmptyOrSpaces(chatRoom)) throw new Error('Invalid Credentials')

            await connection.invoke('JoinChat', { userName, chatRoom } as ChatUser)
            setConnection(connection)
            setChatRoom(chatRoom)
        } catch (error) {
            console.error(error)
        }
    }

    const sendMessage = async (message: string): Promise<void> => {
        await connection?.invoke('SendMessage', message)
    }
    function isEmptyOrSpaces(str: string) {
        return str === null || str.match(/^ *$/) !== null
    }
    const closeChat = async (): Promise<void> => {
        await connection?.stop()
        setConnection(null)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            {connection ? (
                <Chat messages={messages} sendMessage={sendMessage} closeChat={closeChat} chatRoom={chatRoom} />
            ) : (
                <WaitingRoom joinChat={joinChat} />
            )}
        </div>
    )
}

export default App
