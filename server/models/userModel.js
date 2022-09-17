import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [4, "Name requires at least 4 characters"],
        maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false,
    },
    phone: {
        type:Number,
        required: [true, "Please enter your phone number"],
    },

    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    subscribed: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Get JWT Token
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

//Compare Password
UserSchema.methods.onPasswordValidation = async function (password) {
    return await bcrypt.compare(password, this.password);
}


//Generating Password Reset Token
UserSchema.methods.handleResetPasswordToken = function () {
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    const min_15 = 15 * 60 * 1000; 

    //Hashing and adding resetPasswordToken to Schema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + min_15;

    return resetToken;
}

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;