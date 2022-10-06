import express from "express"
const router = express.Router()
import { addOrderItems, getOrderById } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

// in server.js /api/orders ...
router.route("/").post(protect, addOrderItems)
router.route("/:id").get(protect, getOrderById)


export default router