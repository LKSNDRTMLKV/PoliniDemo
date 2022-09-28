import User from "../models/userModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
import cloudinary from 'cloudinary';
import successHandler from "../utils/successHandler.js";
import messageHandler from "../utils/messageHandler.js";

const {
    REGISTER,
    LOGIN,
    LOGOUT,
    PASSWORD_EMAIl,
    INVALID_EMAIL,
    INVALID_PASSWORD,
    ACCOUNT_UPDATE,
    ACCOUNT_DELETE,
    USERS_FOUND,
    USER_FOUND,
    USER_NOT_FOUND,
    USER_UPDATE,
    USER_DELETE,
    PASSWORD_RESET_TOKEN,
    EMAIL_SENT,
    INVALID_PASSWORD_RESET,
    PASSWORD_RESET,
    PASSWORD_OLD,
    PASSWORD_NEW_OLD,
    PASSWORD_NOT_MATCH,
    PASSWORD_UPDATE,
} = messageHandler.userMessages;

//Register User 
const reqisterUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, phone, avatar } = req.body;

    const cloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        quality: 100,
        crop: "scale"
    });

    const user = await User.create({
        name,
        email,
        phone,
        password,
        avatar: {
            public_id: cloud.public_id,
            url: cloud.secure_url,
        },
    });

    sendToken(res, 201, user, REGISTER);
})

//Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler(PASSWORD_EMAIl, 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(INVALID_EMAIL, 400));
    }

    const isPasswordMatched = await user.onPasswordValidation(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(INVALID_PASSWORD, 400));
    }

    sendToken(res, 200, user, LOGIN);
})

//Logout User
const logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    successHandler(res, 200, null, LOGOUT)
})

//Update User
const updateAccount = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone } = req.body;

    const newUserData = {
        name: name,
        email: email,
        phone: phone,
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    successHandler(res, 200, user, ACCOUNT_UPDATE);
});

//Get All Users --Admin
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    successHandler(res, 200, users, USERS_FOUND);
});

//Get User --Admin
const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(USER_NOT_FOUND(req.params.id), 404))
    }

    successHandler(res, 200, user, USER_FOUND);
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

    successHandler(res, 200, user, USER_UPDATE)
});

//Delete Account 
const deleteAccount = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id);
    if (user) {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });
    }

    successHandler(res, 200, null, ACCOUNT_DELETE);
});


//Delete User --Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler(USER_NOT_FOUND(req.params.id), 404));
    }

    successHandler(res, 200, user, USER_DELETE);
});


//Get Account
const getAccount = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    successHandler(res, 200, user, USER_FOUND);
});

//Forgot Password
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler(USER_NOT_FOUND(req.params.id), 404));
    }

    const resetToken = await user.handleResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/app/password/reset/${resetToken}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Polini password recovery",
            message: PASSWORD_RESET_TOKEN(resetPasswordUrl),
        })

        successHandler(res, 200, user.email, EMAIL_SENT(user.email));
    }

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
        return next(new ErrorHandler(INVALID_PASSWORD_RESET, 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(PASSWORD_NOT_MATCH, 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(res, 200, user, PASSWORD_RESET);
});



const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.onPasswordValidation(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler(PASSWORD_OLD, 401));
    }

    if (req.body.oldPassword === req.body.newPassword) {
        return next(new ErrorHandler(PASSWORD_NEW_OLD, 406));
    }

    if (req.body.newPassword !== req.body.comfirmPassword) {
        return next(new ErrorHandler(PASSWORD_NOT_MATCH, 406))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(res, 200, user, PASSWORD_UPDATE);
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