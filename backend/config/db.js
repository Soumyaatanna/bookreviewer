import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB || "book-review-db",
    })
    console.log("[v0] MongoDB connected")
  } catch (error) {
    console.error("[v0] MongoDB connection error:", error.message)
    process.exit(1)
  }
}
