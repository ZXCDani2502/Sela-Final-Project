import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
	Username: String,
	Password: String,
})

// like dbcontext in entity framework
const User = mongoose.model("People", userSchema)
export default User
