import express from "express"
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    getProductByUserId,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts } from "../controllers/productControllers.js"
import { 
    protect, 
    isAdmin } from "../middleware/authMiddleware.js"

router.route("/")
    .get(getProducts)
    .post(protect, createProduct)

router.route("/:id/reviews").post(protect, createProductReview)

router.get("/top", getTopProducts)

router.route("/:id")
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, updateProduct)

router.route("/user/:userId")
    .get(getProductByUserId)

export default router