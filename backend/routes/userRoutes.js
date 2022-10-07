import express from "express"
const router = express.Router()
import { 
    authUser, 
    registerUser, 
    getUserProfile,
    updateUserProfile, 
    getUsers, 
    deleteUser,
    getUserById,
    updateUser } from "../controllers/userController.js"
import { 
    protect, 
    isAdmin } from "../middleware/authMiddleware.js"

// in server.js >> /api/users

router.route("/")
    .post(registerUser)
    .get(protect, isAdmin, getUsers)

router.post("/login", authUser)

// protect middleware run whenever we hit the /profile route
router.route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route("/:id")
    .delete(protect, isAdmin, deleteUser)
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)

export default router