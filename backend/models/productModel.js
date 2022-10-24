import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    name: {type: String,required: true},
    rating: {type: Number,required: true},
    comment: {type: String,required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {
    timestamps: true
})


const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    image1: {
        type: String,
        required: true
        
    },
    image2: {
        type: String
    },
    image3: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0 
    },
    price: {
        type: Number,
        required: true,
        default: 0 
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0 
    },
}, 
    {
        timestamps: true // mongoose will create created_at and updated_at automatically
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product