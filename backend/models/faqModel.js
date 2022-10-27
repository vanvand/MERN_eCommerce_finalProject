import mongoose from "mongoose";


const answerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const faqSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    answers: [answerSchema],
  },
  {
    timestamps: true, // mongoose will create created_at and updated_at automatically
  }
);

const Faq = mongoose.model("Faq", faqSchema);

export default Faq;
