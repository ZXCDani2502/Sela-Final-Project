import mongoose from "mongoose"

const PORT = process.env.PORT || 8080

export const dbConnect = async (app) => {
	await mongoose.connect(process.env.MONGO_CONNECTION)
	app.listen(PORT, () => {
		console.log(`listening on port ${PORT}`)
	})
}
