import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getChat, createChat } from '../controllers/chatController.js';

const router = express.Router();

router.route('/').get(protect, getChat).post(protect, createChat);

export default router;
