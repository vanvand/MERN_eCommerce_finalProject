import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';

//Get Fetch all messages
const getMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name image email')
      .populate('chat')
      .lean()
      .exec();
    return res.status(200).send(messages);
  } catch (error) {
    return res.status(400).send(error.messages);
  }
});

//Post create new message
const createNewMessage = asyncHandler(async (req, res) => {
  const content = req.body;
  const { chatId } = req.params;

  if (!content || !chatId) {
    return res.status(400).send('Invalid data passed into request');
  }

  let newMessage = {
    sender: req.user._id,
    content: content.msg,
    chat: chatId,
  };
  try {
    let message = await Message.create(newMessage);
    message = await Message.findOne({ _id: message._id })
      .populate('sender', 'name image')
      .populate('chat')
      .lean()
      .exec();
    let userMessages = await User.populate(message, {
      path: 'chat.users',
      select: 'name image email',
    });

    let data = await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    return res.status(200).send(message);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export { getMessages, createNewMessage };
