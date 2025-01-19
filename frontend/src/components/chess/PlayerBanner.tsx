import { useEffect, useState } from 'react'
import { Card, Countdown } from 'react-daisyui'
import useClock from '../../hooks/chess/useClock'

type bannerProps = {
    turn: 'w' | 'b'
    user: { username: string; color: 'w' | 'b' }
}

const PlayerBanner = ({ turn, user }: bannerProps) => {
    const { whiteTime, blackTime } = useClock(turn)
    const [seconds, setSeconds] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(10)

    useEffect(() => {
        if (turn === 'w' && user.color === 'w') {
            if (whiteTime % 60 === 0) setMinutes(Math.floor(whiteTime / 60) - 1)
            setSeconds(whiteTime % 60)
        } else if (turn === 'b' && user.color === 'b') {
            if (blackTime % 60 === 0) setMinutes(Math.floor(blackTime / 60) - 1)
            setSeconds(blackTime % 60)
        }
    }, [whiteTime, blackTime])

    return (
        <Card className='bg-neutral text-neutral-content font-mono'>
            <Card.Body className='flex flex-row p-2 rounded-box text-4xl'>
                <Card.Title tag='h1'>{user.username}</Card.Title>
                <Countdown value={minutes} />:
                <Countdown value={seconds} />
            </Card.Body>
        </Card>
    )
}

export default PlayerBanner
