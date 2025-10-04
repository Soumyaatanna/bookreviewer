import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    reviewText: { type: String, trim: true },
  },
  { timestamps: true },
)

// Ensure one review per user per book
reviewSchema.index({ bookId: 1, userId: 1 }, { unique: true })

export default mongoose.model("Review", reviewSchema)
