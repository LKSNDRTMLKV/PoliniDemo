function successHandler (res, status, payload) {
    
    res.status(status).json({
        success: true,
        payload
    })
}

export default successHandler;