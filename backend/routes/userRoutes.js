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
  updateUser,
  addMyWishItem,
  getAllMyWishItems,
  deleteWishItem,
  deleteRentedItem
} from "../controllers/userController.js";
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
    .get(protect, getUserById)
    .put(protect, isAdmin, updateUser)


     //............ /api/users/........
    router.route("/all/mywish").get(protect, getAllMyWishItems);
    router
      .route("/mywish/:productId")
      .get(protect, addMyWishItem)
      .delete(protect, deleteWishItem);
    router
      .route("/myrented/:productId")
      .delete(protect, deleteRentedItem);

export default router