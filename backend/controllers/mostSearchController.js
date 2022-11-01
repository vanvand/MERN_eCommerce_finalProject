import asyncHandler from "express-async-handler";
import MostSearch from "../models/mostSearchModel.js";

const searchProducts = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const newSearch = new MostSearch({ search }).save();
  const allSearch = await MostSearch.find({});

  res.status(201).json(allSearch);
});

const getSearchProducts = asyncHandler(async (req, res) => {
  const mostSearch = await MostSearch.aggregate([
    { $match: {} },
    {
      $group: {
        _id: "$search",
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  res.status(201).json(mostSearch);
});

export { searchProducts, getSearchProducts };
