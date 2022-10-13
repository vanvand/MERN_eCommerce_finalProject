import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    location: {
        city: {
            type: String,
            required: true
        },
        district: {
            type: String
        }
    },
    ratingUser: {
        type: Number,
        required: true,
        default: 0
    },
    numReviewsUser: {
        type: Number,
        required: true,
        default: 0 
    },
    numAdsUser: {
        type: Number,
        required: true,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
},
    {
        timestamps: true // mongoose will create created_at and updated_at automatically
    }
)


// enteredPassword is plain text
// database password is hashed > use bcrypt to encrypt
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


// following will run, e.g. when user is created (userController registerUser handler) to hash the password BEFORE (pre) we save the user to the database
userSchema.pre("save", async function (next) {
    // we only want to hash the password when it is modified > mongoose functionality to check
    if(!this.isModified("password")) {
        next()
    }

    // otherwise, when password is modified, then hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})



const User = mongoose.model("User", userSchema)

export default User