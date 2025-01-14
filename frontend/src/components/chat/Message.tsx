// import useChat from '../../store/useChat'
import { Message as MessageType } from '../../store/useChatStore.ts'
import { extractTime } from '../../utils/extractTime.ts'

const Message = ({ message }: { message: MessageType }) => {
    //TODO check if message is from me or the other user
    // const {authUser} = undefined
    // const { selectedChat } = useChat()
    const fromMe = message.senderId //=== authUser._id
    const chatClassName = fromMe ? 'chat-end' : 'chat-start'
    const bubbleBgColor = fromMe ? 'bg-blue-500' : ''

    return (
        <div className={`chat ${chatClassName}`}>
            <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{extractTime(message.createdAt)}</div>
        </div>
    )
}

export default Message
