import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {

    // pagination functionality
    // static value how many products do we want to show per page
    const pageSize = 4
    // page in query ?pageNumber=2
    const page = Number(req.query.pageNumber || 1)


    const keyword = req.query.keyword ? {
      name: {
        // $regex: MongoDB query to find result where keyword is included
        // no exact matches for text 
        // !! CHECK THIS: https://www.mongodb.com/docs/manual/tutorial/model-data-for-keyword-search/ 
        $regex: req.query.keyword,
        // make search case-insensitive
        $options: "i" 
      }
    } 
    // if keyword does not exist or empty string Product.find remain {}
    : {}

    // get total count of products for pagination functionality
    const count = await Product.count({ ...keyword})

    const products = await Product.find({ ...keyword })
      .limit(pageSize).skip(pageSize * (page -1)) // pagination functionality

    // testing redux error implementation in HomeScreen
    // res.status(401)
    // throw new Error("Not Authorized")

    res.json({ products,
      // pagination functionality
      page, pages: Math.ceil(count / pageSize) // Math.ceil rounds up
    })
})


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
    
    // old from frontend/product.js file
    // const product = products.find(p => p._id === req.params.id)

    res.json(product)
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
    const { name, price, description,image1, image2, image3, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image1 = image1
        product.image2 = image2
        product.image3 = image3
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
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

const getProductsByCategory = asyncHandler(async (req, res) => {
  // const query = req.params.category[0].toUpperCase() + req.params.category.slice(1)

  
  const product = await Product.find({ 
    category: {
      // $regex: MongoDB query to find result where keyword is included
      // no exact matches for text 
      // !! CHECK THIS: https://www.mongodb.com/docs/manual/tutorial/model-data-for-keyword-search/ 
      $regex: req.params.category,
      // make search case-insensitive
      $options: "i" 
    }
   })

if(product) {
    res.json(product)
} else {
    res.status(404)
    throw new Error("Product not found")
}

// old from frontend/product.js file
// const product = products.find(p => p._id === req.params.id)
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory
}

