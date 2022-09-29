import express from "express"
const router = express.Router()
import { authUser, registerUser, getUserProfile } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

// in server.js >> /api/users

router.route("/").post(registerUser)

router.post("/login", authUser)

// protect middleware run whenever we hit the /profile route
router.route("/profile").get(protect, getUserProfile)

export default router