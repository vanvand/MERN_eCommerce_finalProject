import path from "path"
import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import morgan from 'morgan'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()

connectDB()

const app = express()

// bring in morgan - HTTP request logger middleware for node.js
// usually only run in development mode, not production
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

// needed to make json data in request body accessible (used in userController to access email and password)
app.use(express.json())

// ADD ROUTES
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)


// when we hit the paypal route we will fetch the client id stored in .env file
app.get("/api/config/paypal", (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

// make image upload folder static
// __dirname >> point to current directory 
// __dirname is not directly available with ES MODULES (import syntax), only available with common js require syntax >> add path.resolve()
const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname, '/uploads')))


// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   )
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running....')
//   })
// }

// CUSTOM ERROR HANDLING
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))