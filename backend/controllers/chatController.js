import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Chat from '../models/chatModel.js';

// @desc GET chats by id
// @route GET /api/chat/
// @access Private
const getChat = asyncHandler(async (req, res) => {
  try {
    let chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('product')
      .populate('latestMessage')
      .populate('isRequired')
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: 'latestMessage.sender',
          select: 'name image email',
        });
        res.status(200).send(results);
      });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// @desc POST create new chat
// @route POST /api/chat
// @access Private
const createChat = asyncHandler(async (req, res) => {
  try {
    const { selectedUserId, productId } = req.body;
    let chat = await Chat.find({
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
        {
          users: { $elemMatch: { $eq: selectedUserId } },
        },
        { product: productId },
      ],
    })
      .populate('users', '-password')
      .populate('product')
      .populate('latestMessage')
      .populate('isRequired');
    chat = await User.populate(chat[0], {
      path: 'latestMessage.sender',
      select: 'name image email',
    });
    if (chat !== undefined) {
      return res.status(200).send(chat);
    } else {
      let chatData = {
        users: [req.user._id, selectedUserId],
        product: productId,
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          'users',
          '-password'
        );
        return res.status(200).send(FullChat);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// router.put('/rename',
// const updateChat = asyncHandler(async (req, res) => {
//   try {
//     const { chatId, isRequired } = req.body;

//     const updatedChat = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         isRequired: isRequired,
//       },
//       {
//         new: true,
//       }
//     )
//       .populate('users', '-password')

//     if (!updatedChat) {
//       return res.status(404).send('Chat Not Found');
//     } else {
//       res.json(updatedChat);
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// });

const updateChat = asyncHandler(async (req, res) => {
  const { _id, users, product, latestMessage, isRequired } = req.body;
  const chat = await Chat.findById(_id);
  if (chat) {
    chat.users = users || chat.users;
    chat.product = product || chat.product;
    chat.latestMessage = latestMessage || chat.latestMessage;
    chat.isRequired = isRequired;

    // Chat.updateOne({_id: _id}, {$set: {isRequired: }})
    const updatedChat = await chat.save();
    res.status(201).json(updatedChat);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// router.put('/removemember', async (req, res) => {
//   try {
//     const { chatId, userId } = req.body;
//     const removed = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         $pull: { users: userId },
//       },
//       {
//         new: true,
//       }
//     )
//       .populate('users', '-password')
//       .populate('groupAdmin', '-password');

//     if (!removed) {
//       return res.status(404).send('Chat Not Found');
//     } else {
//       res.json(removed);
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// });

// router.put('/addmember', async (req, res) => {
//   try {
//     const { chatId, userId } = req.body;

//     const added = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         $push: { users: userId },
//       },
//       {
//         new: true,
//       }
//     )
//       .populate('users', '-password')
//       .populate('groupAdmin', '-password');

//     if (!added) {
//       return res.status(404).send('Chat Not Found');
//     } else {
//       res.json(added);
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// });

export { getChat, createChat, updateChat };
