import asyncHandler from 'express-async-handler';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';

// @desc GET chats by id
// @route GET /api/chat/
// @access Private
const getChat = asyncHandler(async (req, res) => {
  try {
    let chat = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('latestMessage')
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
    const { selectedUserId } = req.body;
    let chat = await Chat.find({
      $and: [
        {
          users: { $elemMatch: { $eq: req.user._id } },
        },
        {
          users: { $elemMatch: { $eq: selectedUserId } },
        },
      ],
    })
      .populate('users', '-password')
      .populate('latestMessage');
    chat = await User.populate(chat[0], {
      path: 'latestMessage.sender',
      select: 'name image email',
    });
    if (chat !== undefined) {
      return res.status(200).send(chat);
    } else {
      let chatData = {
        users: [req.user._id, selectedUserId],
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

// router.put('/rename', async (req, res) => {
//   try {
//     const { chatId, chatName } = req.body;

//     const updatedChat = await Chat.findByIdAndUpdate(
//       chatId,
//       {
//         chatName: chatName,
//       },
//       {
//         new: true,
//       }
//     )
//       .populate('users', '-password')
//       .populate('groupAdmin', '-password');

//     if (!updatedChat) {
//       return res.status(404).send('Chat Not Found');
//     } else {
//       res.json(updatedChat);
//     }
//   } catch (error) {
//     return res.status(400).send(error.message);
//   }
// });

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

export { getChat, createChat };
