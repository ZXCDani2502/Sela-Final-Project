import toast from 'react-hot-toast'
import { useSocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router'
import { useAuthStore } from '../store/useAuthStore'

const HomePage = () => {
    const { socket } = useSocketContext()
    const { authUser } = useAuthStore()

    const navigate = useNavigate()

    const enterQueue = () => {
        if (!authUser) {
            return navigate('/login')
        }
        if (!socket) {
            return toast.error('You must be logged in to enter the queue')
        }
        toast('Entered queue')
        
        socket.emit('queue', authUser?._id)
        socket.on('matchFound', ({matchId,color}) => {
            console.log(matchId)
            navigate('/game',{state:{color}})
        })
    }

    return (
        <div className='p-4 h-screen flex items-center justify-center'>
            <button className='btn btn-ghost' onClick={enterQueue}>
                Find Match
            </button>
        </div>
    )
}
//OPTIONAL off the navbar, a friends button that will open a sidebar where you can chat with friends and invite them to games
export default HomePage
