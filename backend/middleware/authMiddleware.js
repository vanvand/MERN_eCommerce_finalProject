import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

// middleware function
const protect = asyncHandler(async (req, res, next) => {
    let token

    // print JWT token in terminal
    // console.log(req.headers.authorization) 


    // CASE: Token found
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer") // token in headers.authorization always start with "Bearer" so we check for this
    ) {
        try {
            token = req.headers.authorization.split(" ")[1] // exclude the Bearer string to get token itself
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // console.log(decoded) // { id: '63333c419c777ad4b6838d3d', iat: 1664453510, exp: 1667045510 }

            // req.user is now available for all (protected) routes
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }

    // CASE: Token not found
    if(!token) {
        res.status(401) // 401 = unauthorized
        throw new Error("Not authorized, no token")
    }

})

const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized as an admin")
    }
}

export { protect, isAdmin }