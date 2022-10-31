import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  getMessages,
  createNewMessage,
} from '../controllers/messageController.js';

const router = express.Router();

router.route('/:chatId').post(protect, createNewMessage);

router.route('/:chatId').get(protect, getMessages);

export default router;
