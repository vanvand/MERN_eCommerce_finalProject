import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {


  let {keyword}  = req.query;

  // Create expression
  var re = new RegExp(keyword, "i");
  let find = {};

  if (keyword != undefined && keyword != "") {
    //This all are the fields that will used as match
    find = {
      $or: [{ name: { $regex: re } }, { category: { $regex: re } }],
    };
  }

  // pagination functionality
  // static value how many products do we want to show per page
  // page in query ?pageNumber=2
  const page = Number(req.query.pageNumber || 1);

  const pageSize = 10; //still pagination not working

  //get all products with filter name or category
  console.log(find);
  let products = await Product.find(find)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 }).populate('user'); //sort products by created time

  //get all products without filter
  const allProductsCategory = await Product.find({});

  // get total count of products for pagination functionality
  const count = await Product.count();
  let totalCount = products.length + 1;
  // console.log(totalCount);
  // console.log(Math.ceil(totalCount / pageSize));

  res.json({
    products,
    allProductsCategory,
    // pagination functionality
    page,
    pages: Math.ceil(totalCount / pageSize), // Math.ceil rounds up
  });
});



// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id)
    
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// @desc Fetch products from userId
// @route GET /api/products/:userId
// @access Public
const getProductByUserId = asyncHandler(async (req, res) => {
      const products = await Product.find({user: req.params.userId})

    if(products) {
        res.json(products)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})


// @desc DELETE a product
// @route DELETE /api/products/:id
// @access Private/admin
const deleteProduct = asyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id)
    
    if(product) {
        await product.remove() // mongoose query
        res.json({ message: "Product removed"})
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// @desc CREATE a product
// @route POST /api/products
// @access Private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand",
        category: "Sample category",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description"
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc UPDATE a product
// @route PUT /api/products/:id
// @access Private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct)
    } else {
        res.status(404)
        throw new Error("Product not found")
    }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  // check if requesting user already reviewed product
  if (product) {
    const alreadyReviewed = product.reviews.find(
        
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    // if not already reviewed
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    // add new review to reviews array
    product.reviews.push(review)

    product.numReviews = product.reviews.length

    // update overall rating (stars)
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  // sort in ascending order and limit to three products only
  const products = await Product.find({})
    .sort({ rating: -1 })
    .limit(4)
    .populate("user");

  res.json(products)
})

const getTopCategoryName = asyncHandler(async (req, res) => {
  
  const products = await Product.find({})

  if (products) {
    const topCategory = await Product.aggregate([
      { $match: {} },
      { $group: { _id: "$category", rating: { $sum: "$rating" } } },
    ])
      .sort({ rating: -1 })
      .limit(1);
    if (topCategory) {
      const topCategoryProduct = await Product.find({
        category: topCategory[0]._id,
      })
        .sort({ rating: -1 })
        .limit(4);;
      res.json(topCategoryProduct);
    }
  }
  
  
});

export {
  getProducts,
  getProductById,
  getProductByUserId,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getTopCategoryName,
};
