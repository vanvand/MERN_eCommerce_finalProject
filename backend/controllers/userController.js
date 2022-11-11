import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"
import User from "../models/userModel.js"


// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email: email})

    // if user exist and user password match with password in database
    // matchPassword defined in userModel
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        }) 
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})


// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, city, district } = req.body

    const userExists = await User.findOne({email: email})

    if(userExists) {
        res.status(400) // 400 = bad request
        throw new Error("User already exists")
    }

    // if user doesn't exist create new User
    // in userModel make sure that password is hashed before user creation
    const user = await User.create({
        name,
        email,
        password,
        city,
        district
    })

    // if user is created successfully give back complete user data json
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            district: user.district,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})


// @desc GET user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)
    
    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            city: user.city,
            district: user.district,
            isAdmin: user.isAdmin,
        })
        
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc UPDATE user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }
        user.image = req.body.image || user.image
        user.city = req.body.city || user.city
        user.district = req.body.district || user.district

        const updatedUser = await user.save()

         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
            city: updatedUser.city,
            district: updatedUser.district,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        }) 

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


// @desc GET all profile
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    // get all users
    const users = await User.find({})
    res.json(users)
})

// @desc DELETE user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove() // mongoose query
        res.json({ message: "User removed" })
    } else {
        res.status(404)
        throw new Error("User not found")
    }

})

// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    // 
    const user = await User.findById(req.params.id).select("-password")
    if(user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc UPDATE user 
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id) // find user from url id

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        // password change not wanted
        // if(req.body.password) {
        //     user.password = req.body.password
        // }
        user.image = req.body.image || user.image
        user.city = req.body.city || user.city
        user.district = req.body.district || user.district
        user.isAdmin = req.body.isAdmin 

        const updatedUser = await user.save()

         res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            image: updatedUser.image,
            city: updatedUser.city,
            district: updatedUser.district,
            isAdmin: updatedUser.isAdmin
        }) 

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

//................................................................

// @desc Add new wish
// @route get /api/wishs
// @access Private
const addMyWishItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  if (userId) {
    User.findByIdAndUpdate(
      userId,
      { $push: { wishItems: req.params.productId } },
      { new: true },
      (err, user) => {
        res.json(user);
      }
    ).populate("wishItems");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get All mywish
// @route get /api/wishs
// @access Private

const getAllMyWishItems = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  if (userId) {
    //console.log(userId);
    User.findById(userId, (err, user) => {
      res.json(user.wishItems);
    }).populate("wishItems");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Delete one wish
// @route delete /api/wishs
// @access Private

const deleteWishItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  if (userId) {
    User.findByIdAndUpdate(
      userId,
      { $pull: { wishItems: req.params.productId } },
      { new: true },
      (err, user) => {
        res.json(user);
      }
    ).populate("wishItems");
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const deleteRentedItem = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  if (userId) {
    User.findByIdAndUpdate(
      userId, {
        rentedTo : ''
      },
      { new: true },
      (err, user) => {
        res.json(user);
      }
    )
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addMyWishItem,
  getAllMyWishItems,
  deleteWishItem,
  deleteRentedItem
};