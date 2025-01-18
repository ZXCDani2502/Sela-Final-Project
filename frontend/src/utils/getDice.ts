import axios from "axios"
export async function getDice() {
    let dice: (1 | 2 | 3 | 4 | 5 | 6)[] = []
    await axios.get('https://localhost:6500/game').then((response) => (dice = response.data))
    console.log(dice)
    return dice
}