import axios from 'axios'
import { useState, useEffect } from 'react'
import Dice from 'react-dice-roll'

async function getDice() {
    let dice: (1 | 2 | 3 | 4 | 5 | 6)[] = []
    await axios.get('https://localhost:6500/game').then((response) => (dice = response.data))
    return dice
}

export const DiceRoll = () => {
    const [dice, setDice] = useState<(1 | 2 | 3 | 4 | 5 | 6)[]>([])
    const [diceOne, setDiceOne] = useState<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined)
    const [diceTwo, setDiceTwo] = useState<1 | 2 | 3 | 4 | 5 | 6 | undefined>(undefined)
    useEffect(() => {
        getDice().then((dice) => {
            setDice(dice)
            setDiceOne(dice[0])
            setDiceTwo(dice[1])
        })
    }, [])
    console.log(dice)
    return (
        <div>
            <Dice cheatValue={diceOne} />

            <Dice cheatValue={diceTwo} />
        </div>
    )
}
export default DiceRoll
