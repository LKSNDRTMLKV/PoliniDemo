//Create token and cookie

const sendToken = (res, status, user) => {
    const token = user.getJWTToken();

    const hours_24 = 24 * 60 * 60 * 1000;

    //options for cookies
    const options = {
        
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * hours_24
        ),
        httpOnly: true,
        // Add after lauch and
        // secure:true,

    }

    res.status(status).cookie('token', token, options).json({
        success:true,
        user,
        token,
    })
}

export default sendToken;