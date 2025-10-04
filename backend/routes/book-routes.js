import { Router } from "express"
import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controllers/book-controller.js"
import { verifyToken } from "../middleware/auth.js"

const router = Router()

router.get("/", getBooks)
router.get("/:id", getBookById)
router.post("/", verifyToken, createBook)
router.put("/:id", verifyToken, updateBook)
router.delete("/:id", verifyToken, deleteBook)

export default router
