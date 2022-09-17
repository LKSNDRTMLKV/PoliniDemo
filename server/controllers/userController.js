import User from "../models/userModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary';



//Register User 
const reqisterUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phone,avatar } = req.body;

    const cloud = await cloudinary.v2.uploader.upload(avatar, {
        folder:"avatars",
        quality:100,
        crop:"scale"
    });

    const user = await User.create({
        name,
        email,
        phone,
        password,
        avatar: {
            public_id:cloud.public_id,
            url:cloud.secure_url,
        },
    });

    sendToken(res, 201, user);
})

//Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password"), 400);
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email", 400));
    }

    const isPasswordMatched = await user.onPasswordValidation(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid password", 400));
    }

    sendToken(res, 200, user);
})

//Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
})

//Update User
const updateAccount = catchAsyncErrors(async (req, res, next) => {
    const {name, email, phone} = req.body;

    const newUserData = {
        name: name,
        email: email,
        phone: phone,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    
    res.status(200).json({
        success: true,
        user
    })
});

//Get All Users --Admin
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
});

//Get All User --Admin
const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`))
    }

    res.status(200).json({
        success: true,
        user
    })
});

//Update User  --Admin
const updateUser = catchAsyncErrors(async (req, res, next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    });

    // sendToken(res, 200, user);
    res.status(200).json({
        success: true,
        message: "Account updated successfully",
        user,
    })
});

//Delete Account 
const deleteAccount = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);
    if(user) {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
    }
    
        res.status(200).json({
        success:true,
        message:"Account deleted successfully"
    })
})


//Delete User --Admin
const deleteUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) {
        return next(new ErrorHandler(`User with id ${req.params.id} does not exist`));
    }
    res.status(200).json({
        success: true,
        message:"User deleted successfully",
    })
})


//Get Account
const getAccount = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
});

//Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found"), 404);
    }

    const resetToken = await user.handleResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/app/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore this message`;
    // const message = `Hello Dzaci you have been selected to view this awesome resource \n\n https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab \n\n Please click me! \n ps safe for work`

    try {
        await sendEmail({
            email: user.email,
            subject: "Polini password recovery",
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    }
    // try {
    //     await sendEmail({
    //         email: user.email,
    //         subject: "Open me Dzaci",
    //         message
    //     })
    //     res.status(200).json({
    //         success: true,
    //         message: `Email sent to ${user.email} successfully`
    //     })
    // }


    catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }

})


// Reset Password
const resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(res, 200, user);
});



const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.onPasswordValidation(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.oldPassword === req.body.newPassword) {
        return next(new ErrorHandler("New password cannot be your old password"));
    }

    if (req.body.newPassword !== req.body.comfirmPassword) {
        return next(new ErrorHandler("Passwords do not match"))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(res, 200, user);
})




const userController = {
    reqisterUser,
    loginUser,
    logoutUser,
    updateUser,
    getAllUsers,
    getAccount,
    updateAccount,
    deleteUser,
    deleteAccount,
    getUser,
    forgotPassword,
    resetPassword,
    updatePassword,
}

export default userController;