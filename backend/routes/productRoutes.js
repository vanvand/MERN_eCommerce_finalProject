import express from "express"
const router = express.Router()
import { 
    getProducts, 
    getProductById, 
    deleteProduct,
    createProduct,
    updateProduct } from "../controllers/productControllers.js"
import { 
    protect, 
    isAdmin } from "../middleware/authMiddleware.js"


// router.get("/", getProducts)
// router.get("/:id", getProductById)

router.route("/")
    .get(getProducts)
    .post(protect, isAdmin, createProduct)
router.route("/:id")
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)


export default router