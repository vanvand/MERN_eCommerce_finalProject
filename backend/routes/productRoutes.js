import express from "express"
import asyncHandler from "express-async-handler"
const router = express.Router()
import Product from "../models/productModel.js"

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.get("/", asyncHandler(async (req, res) => {
    const products = await Product.find({})

    // testing redux error implementation in HomeScreen
    // res.status(401)
    // throw new Error("Not Authorized")

    res.json(products)
}))

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get("/:id", asyncHandler(async (req, res) => {
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
}))

export default router