import jwt from "jsonwebtoken"
import User from "../models/user.js"

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || ""
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null
    if (!token) return res.status(401).json({ message: "Unauthorized: Missing token" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select("-password")
    if (!user) return res.status(401).json({ message: "Unauthorized: Invalid token" })

    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" })
  }
}
