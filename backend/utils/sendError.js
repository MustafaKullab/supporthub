const sendError = (res , status , message , errors = null) => {
    return res.status(status).json({success: false , data:{message , errors , status}});
}

module.exports = sendError;