import mongoose from 'mongoose'

const setGames = () => {
    return this.wins + this.losses + this.draws
}

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        elo: {
            type: Number,
            required: true,
            default: 800,
        },
        games: {
            type: Number,
            required: true,
            default: 0,
            set: setGames, //TODO call user.games.set after each game
        },
        wins: {
            type: Number,
            required: true,
            default: 0,
        },
        losses: {
            type: Number,
            required: true,
            default: 0,
        },
        draws: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema)
export default User
