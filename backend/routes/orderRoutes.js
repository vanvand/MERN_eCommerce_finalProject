import express from "express"
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid } from "../controllers/orderController.js"
import { protect } from "../middleware/authMiddleware.js"

// in server.js /api/orders ...
router.route("/").post(protect, addOrderItems)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)


export default router