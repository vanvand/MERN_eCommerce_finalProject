// not connected to our server, completely separate
import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import users from "./data/users.js"
import products from "./data/products.js"
import User from "./models/userModel.js"
import Product from "./models/productModel.js"
import Order from "./models/orderModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
    try {
        // clear database before importing
        // x.deleteMany will return promise so add await
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        // create array with users
        const createdUsers = await User.insertMany(users) 
        // from that array get adminUser > first item in users.js
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            // Object with all product data already present plus adminUser
            return { ...product, user: adminUser} // spread operator spread over all existing products
        })

        await Product.insertMany(sampleProducts)

        console.log("Data Imported!".green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log("Data Destroyed!".green.inverse)
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1)
    }
}

// script execution via terminal, use process.arg to read command-line arguments
// to add data $ node backend/seeder
// to destroy data $ node backend/seeder -d
if(process.argv[2] === "-d") {
    destroyData()
} else {
    importData()
}

// in root package.json add to make commands more readable
    // "data:import": "node backend/seeder",
    // "data:destroy": "node backend/seeder -d"