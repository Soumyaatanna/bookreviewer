import { Router } from "express"
import { addReview, deleteReview, updateReview } from "../controllers/review-controller.js"
import { verifyToken } from "../middleware/auth.js"

const router = Router()

router.post("/:bookId", verifyToken, addReview)
router.put("/:id", verifyToken, updateReview)
router.delete("/:id", verifyToken, deleteReview)

export default router
