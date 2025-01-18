import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //in ms
        httpOnly: true, //prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
    })
}

export default generateTokenAndSetCookie
