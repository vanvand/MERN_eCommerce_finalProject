import express from "express";
const router = express.Router();
import {
  getFaqs,
  getFaqById,
  deleteFaq,
  createFaq,
  updateFaq,
  createFaqAnswer,
  deleteFaqAnswer,
} from "../controllers/faqController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(getFaqs).post(createFaq);

router
  .route("/ans/:id/answers")
  .post(protect, createFaqAnswer)
  .delete(protect, isAdmin, deleteFaqAnswer);

  

router
  .route("/:id")
  .get(getFaqById)
  .delete( deleteFaq)
  .put(updateFaq);


  
export default router;
