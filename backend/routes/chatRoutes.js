import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  getChat,
  createChat,
  updateChat,
} from '../controllers/chatController.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getChat)
  .post(protect, createChat)
  .put(protect, updateChat);

export default router;
