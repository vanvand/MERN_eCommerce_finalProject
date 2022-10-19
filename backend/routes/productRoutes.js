import express from "express"
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts,
    getProductsByCategory
 } from "../controllers/productControllers.js"
import { 
    protect, 
    isAdmin } from "../middleware/authMiddleware.js"

router.route("/")
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router.route("/category/:category").get(getProductsByCategory)

router.route("/:id/reviews").post(protect, createProductReview)

router.get("/top", getTopProducts)

router.route("/:id")
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)


export default router