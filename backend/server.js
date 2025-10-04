import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth-routes.js"
import bookRoutes from "./routes/book-routes.js"
import reviewRoutes from "./routes/review-routes.js"
import { errorHandler, notFound } from "./middleware/error-handler.js"

dotenv.config()

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*",
    credentials: true,
  }),
)
app.use(express.json())
app.use(morgan("dev"))

// Health check
app.get("/health", (_, res) => res.json({ ok: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/books", bookRoutes)
app.use("/api/reviews", reviewRoutes)

// Errors
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => console.log(`[v0] Server running on port ${PORT}`))
})
