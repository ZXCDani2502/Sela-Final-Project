import mongoose from 'mongoose'

const PORT = process.env.PORT || 6600

export const dbConnect = async (server) => {
    await mongoose.connect(process.env.MONGO_CONNECTION)
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}
