const mongoose = require("mongoose");
const STATUS = require("../constants/httpStatus");
const { createCommentRep, getCommentsRep } = require("../repositories/commentRepo");
const { getRequestById } = require("../repositories/requestRepo");
const createError = require("../utils/createError");

// Create Comment 
const createCommentSrv = async (data) => {

    if(!mongoose.Types.ObjectId.isValid(data.requestId)){
            throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const request = await getRequestById(data.requestId);

    if(!request)
        throw(createError(STATUS.NOT_FOUND , "Request Not Found."));


    if((String(request.employeeId) !== String(data.employeeId)) && data.role !== "admin"){
        throw(createError(STATUS.NOT_FORBIDDEN , "Not allow."));
    }

    const comment = await createCommentRep(data);

    return comment;
}

// Get All Comments 
const getCommentsSrv = async (data) => {

     if(!mongoose.Types.ObjectId.isValid(data.requestId)){
        throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const request = await getRequestById(data.requestId);

    if(!request)
        throw(createError(STATUS.NOT_FOUND , "Request Not Found."));

    if((String(request.employeeId) !== String(data.employeeId)) && data.role !== "admin"){
        throw(createError(STATUS.NOT_FORBIDDEN , "Not allow."));
    }

    const comments = await getCommentsRep(data.requestId);

    return comments;
}

module.exports = {createCommentSrv , getCommentsSrv};