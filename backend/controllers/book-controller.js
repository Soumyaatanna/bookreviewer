import Book from "../models/book.js"
import Review from "../models/review.js"
import mongoose from "mongoose"

// Helper aggregation to compute average rating and count
const withRatingsStage = [
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "bookId",
      as: "reviews",
    },
  },
  {
    $addFields: {
      averageRating: { $ifNull: [{ $avg: "$reviews.rating" }, 0] },
      reviewCount: { $size: "$reviews" },
    },
  },
  {
    $project: {
      reviews: 0,
    },
  },
]

export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, year } = req.body
    if (!title || !author || !description || !genre || !year)
      return res.status(400).json({ message: "All fields are required" })

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    })
    res.status(201).json(book)
  } catch (err) {
    next(err)
  }
}

export const getBooks = async (req, res, next) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page) || 1, 1)
    const limit = Math.max(Number.parseInt(req.query.limit) || 5, 1)
    const skip = (page - 1) * limit

    const { q, genre, author, title, sort } = req.query
    const filter = {}

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
        { genre: { $regex: q, $options: "i" } },
      ]
    }
    if (genre) filter.genre = new RegExp(genre, "i")
    if (author) filter.author = new RegExp(author, "i")
    if (title) filter.title = new RegExp(title, "i")

    // Sorting: "rating" | "-rating" | "year" | "-year" | "createdAt"
    let sortStage = { createdAt: -1 }
    if (sort) {
      if (sort === "rating") sortStage = { averageRating: 1 }
      else if (sort === "-rating") sortStage = { averageRating: -1 }
      else if (sort === "year") sortStage = { year: 1 }
      else if (sort === "-year") sortStage = { year: -1 }
    }

    const [items, total] = await Promise.all([
      Book.aggregate([
        { $match: filter },
        ...withRatingsStage,
        { $sort: sortStage },
        { $skip: skip },
        { $limit: limit },
        { $lookup: { from: "users", localField: "addedBy", foreignField: "_id", as: "owner" } },
        { $addFields: { owner: { $first: "$owner" } } },
        { $project: { "owner.password": 0 } },
      ]),
      Book.countDocuments(filter),
    ])

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    })
  } catch (err) {
    next(err)
  }
}

export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: "Invalid book id" })

    const [book] = await Book.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      ...withRatingsStage,
      { $lookup: { from: "users", localField: "addedBy", foreignField: "_id", as: "owner" } },
      { $addFields: { owner: { $first: "$owner" } } },
      { $project: { "owner.password": 0 } },
    ])
    if (!book) return res.status(404).json({ message: "Book not found" })

    const reviews = await Review.find({ bookId: id }).populate("userId", "-password").sort({ createdAt: -1 })

    res.json({ ...book, reviews })
  } catch (err) {
    next(err)
  }
}

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    if (!book) return res.status(404).json({ message: "Book not found" })
    if (book.addedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden: Not the owner" })

    const allowed = ["title", "author", "description", "genre", "year"]
    allowed.forEach((k) => {
      if (req.body[k] !== undefined) book[k] = req.body[k]
    })
    await book.save()
    res.json(book)
  } catch (err) {
    next(err)
  }
}

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)
    if (!book) return res.status(404).json({ message: "Book not found" })
    if (book.addedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Forbidden: Not the owner" })

    await Review.deleteMany({ bookId: id })
    await book.deleteOne()
    res.json({ message: "Book deleted" })
  } catch (err) {
    next(err)
  }
}
