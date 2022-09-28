function successHandler (res, status, payload, message) {
    res.status(status).json({
        success: true,
        payload,
        message,
    })
}

export default successHandler;