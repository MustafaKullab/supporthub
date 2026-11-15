const STATUS = require("../constants/httpStatus");

const authAdmin = (role) => {
    return (req,res,next) => {
        if(req.employee.role === role)
            next();
        else{
            return res.status(STATUS.NOT_FORBIDDEN).json({success: false , message: "Not allow." })
        }
    }
}

module.exports = authAdmin;