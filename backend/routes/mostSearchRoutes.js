import express from "express";
const router = express.Router();

import {
  searchProducts,
  getSearchProducts,
} from "../controllers/mostSearchController.js";

// "/api/search";
router.route("/").get(searchProducts);
router.route("/mostsearch").get(getSearchProducts);

export default router;
