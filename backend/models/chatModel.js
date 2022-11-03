import mongoose from 'mongoose';

const chatSchema = mongoose.Schema(
  {
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  },
  { timestamps: true, versionKey: false }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
