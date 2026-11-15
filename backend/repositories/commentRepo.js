const Comment = require("../models/Comment")

const createCommentRep = async (data) => {
    return await Comment.create({requestId: data.requestId , employeeId: data.employeeId , body: data.body});
}

const getCommentsRep = async (requestId) => {
    return await Comment.find({requestId}).sort({createdAt: 1});
}

module.exports = {createCommentRep , getCommentsRep};