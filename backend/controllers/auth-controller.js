import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.js"

const signToken = (user) => jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: "Email already in use" })

    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed })
    const token = signToken(user)
    res.status(201).json({ user: user.toJSON(), token })
  } catch (err) {
    next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: "Invalid credentials" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Invalid credentials" })

    const token = signToken(user)
    res.json({ user: user.toJSON(), token })
  } catch (err) {
    next(err)
  }
}

export const me = async (req, res) => {
  res.json({ user: req.user })
}
