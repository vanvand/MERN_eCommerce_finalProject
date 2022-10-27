import asyncHandler from "express-async-handler";
import Faq from "../models/faqModel.js";
import mongoose from "mongoose";

// @desc Fetch all faqs
// @route GET /api/faqs
// @access Public
const getFaqs = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber || 1);

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Faq.count({ ...keyword });

  const faqs = await Faq.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    faqs,
    page,
    pages: Math.ceil(count / pageSize),
  });
});

// @desc Fetch single faq
// @route GET /api/faqs/:id
// @access Public
const getFaqById = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (faq) {
    res.json(faq);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }

});

// @desc DELETE a faq
// @route DELETE /api/faqs/:id
// @access Private/admin
const deleteFaq = asyncHandler(async (req, res) => {
  const faq = await Faq.findById(req.params.id);

  if (faq) {
    await faq.remove(); // mongoose query
    res.json({ message: "Question removed" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc CREATE a faq
// @route POST /api/faqs
// @access Private/admin
const createFaq = asyncHandler(async (req, res) => {
  const faq = new Faq({
    _id: req.body.id,
    title: "Sample title",
    description: "Sample description",
  });
  if (faq) {
    const createdFaq = await faq.save();
    res.status(201).json(createdFaq);
  } else {
    res.status(404);
    throw new Error("Question not created");
  }
});

// @desc UPDATE a faq
// @route PUT /api/faqs/:id
// @access Private/admin
const updateFaq = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const faq = await Faq.findById(req.params.id);

  if (faq) {
    faq.title = title;
    faq.description = description;

    const updatedFaq = await faq.save();
    res.status(201).json(updatedFaq);
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Create new answer
// @route   POST /api/faq/:id/answers
// @access  Private
const createFaqAnswer = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const faq = await Faq.findById(req.params.id);

  if (faq) {
    const answer = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    // add new answer to answers array
    faq.answers.push(answer);

    await faq.save();
    res.status(201).json({ message: "Answer added" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc DELETE a Answer
// @route DELETE /api/faqs/:id/answers/:id
// @access Private/admin
const deleteFaqAnswer = asyncHandler(async (req, res) => {
  const id = req.params.id;
  
  Faq.updateOne(
    {
      answers: { $elemMatch: { _id: mongoose.Types.ObjectId(id) } },
    },
    { $pull: { answers: { _id: mongoose.Types.ObjectId(id) } } }
  )
    .then((result) => {
      //console.log(result);
      if (result.modifiedCount > 0) {
        // success
        res.json({ message: "Answer removed" });
      } else { 
        // answer not found
        res.json({ message: "Answer not found" });
      }
      
    })
    .catch((error) => {
      console.log(error);
      res.status(404);
      throw new Error("Answer not found");
    });

});

export {
  getFaqs,
  getFaqById,
  deleteFaq,
  createFaq,
  updateFaq,
  createFaqAnswer,
  deleteFaqAnswer,
};
