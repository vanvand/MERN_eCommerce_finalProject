import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"


// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
     const products = await Product.find({})

    // testing redux error implementation in HomeScreen
    // res.status(401)
    // throw new Error("Not Authorized")

    res.json(products)
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

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }