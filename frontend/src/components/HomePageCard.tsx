import toast from 'react-hot-toast'
import { useSocketContext } from '../context/SocketContext.tsx'
import { useAuthStore } from '../store/useAuthStore.ts'
import { useNavigate } from 'react-router'

type CardProps = {
  src: string
  title: string
  description: string
  href?: string
}


const HomePageCard = ({src, title, description, href} : CardProps) => {
  const { socket } = useSocketContext()
  const { authUser } = useAuthStore()

  const navigate = useNavigate()

  const enterChessQueue = () => {
    if (!authUser) return navigate('/Login')
    if (!socket) {
        return toast.error('You must be logged in to enter the queue')
    }
    toast('Entered queue')
    
    socket.emit('queue', authUser?._id)
    socket.on('matchFound', ({matchId,color}) => {
        console.log(matchId)
        navigate('/Chess',{state:{color}})
    })
  }

  return (
    <div className="card card-compact w-96 m-10 bg-base-100 shadow-xl">
      <figure>
        <img src={src} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{title}</h2>
        <p>{description}</p>
        <div className="card-actions pt-4 justify-center">
          {title === 'Chess' ? 
            <button className="btn btn-primary" onClick={enterChessQueue}>Play Now</button> :
            <a className="btn btn-primary" href={href}>Play Now</a>
          }
        </div>
      </div>
    </div>
  )
}

export default HomePageCard