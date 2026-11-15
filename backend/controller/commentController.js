const STATUS = require("../constants/httpStatus");
const { createCommentSrv, getCommentsSrv } = require("../services/commentService");

// Create Comment 
const createComment = async (req,res) => {
    const {requestId} = req.params;
    const employeeId = req.employee._id;
    const role = req.employee.role;
    const {body} = req.body;

    const comment = await createCommentSrv({requestId , employeeId , body , role});

    return res.status(STATUS.CREATED).json({success: true , data: {comment}});
};

// Get All Comments 
const getComments = async (req,res) => {
    const {requestId} = req.params;
    const employeeId = req.employee._id;
    const role = req.employee.role;

    const comments = await getCommentsSrv({requestId , employeeId , role});

    return res.status(STATUS.OK).json({success: true , data: {comments}});
}

module.exports = {createComment , getComments}; 