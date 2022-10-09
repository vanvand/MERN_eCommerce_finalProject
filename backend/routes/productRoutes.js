import express from "express"
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts } from "../controllers/productControllers.js"
import { 
    protect, 
    isAdmin } from "../middleware/authMiddleware.js"


// router.get("/", getProducts)
// router.get("/:id", getProductById)

router.route("/")
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router.route("/:id/reviews").post(protect, createProductReview)

router.get("/top", getTopProducts)

router.route("/:id")
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)


export default router