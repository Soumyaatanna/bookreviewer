import Review from "../models/review.js"
import Book from "../models/book.js"
import mongoose from "mongoose"

export const addReview = async (req, res, next) => {
  try {
    const { bookId } = req.params
    const { rating, reviewText } = req.body
    if (!mongoose.isValidObjectId(bookId)) return res.status(400).json({ message: "Invalid book id" })
    const exists = await Book.findById(bookId)
    if (!exists) return res.status(404).json({ message: "Book not found" })
    if (!rating) return res.status(400).json({ message: "Rating is required" })

    const review = await Review.create({
      bookId,
      userId: req.user._id,
      rating,
      reviewText: reviewText || "",
    })
    const populated = await review.populate("userId", "-password")
    res.status(201).json(populated)
  } catch (err) {
    // duplicate key (one per user per book)
    if (err?.code === 11000) {
      err.statusCode = 409
      err.message = "You have already reviewed this book"
    }
    next(err)
  }
}

export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) return res.status(404).json({ message: "Review not found" })
    if (review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden: Not the owner" })
    const { rating, reviewText } = req.body
    if (rating !== undefined) review.rating = rating
    if (reviewText !== undefined) review.reviewText = reviewText
    await review.save()
    const populated = await review.populate("userId", "-password")
    res.json(populated)
  } catch (err) {
    next(err)
  }
}

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) return res.status(404).json({ message: "Review not found" })
    if (review.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden: Not the owner" })
    await review.deleteOne()
    res.json({ message: "Review deleted" })
  } catch (err) {
    next(err)
  }
}
