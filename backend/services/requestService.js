const STATUS = require("../constants/httpStatus");
const mongoose = require("mongoose");

const { createRequestRep , employeeRequestsRep , allRequestsRep , specRequestRep , updateStatusRep } = require("../repositories/requestRepo");
const createError = require("../utils/createError");

const createRequestServ = async (data) => {

    if(!mongoose.Types.ObjectId.isValid(data.employeeId)){
        throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const request = await createRequestRep(data);
    return request;
}


const employeeRequestsSrv = async (employeeId) => {

    if(!mongoose.Types.ObjectId.isValid(employeeId)){
        throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const requests = await employeeRequestsRep(employeeId);
    return requests;
}


const allRequestsSrv = async () => {
    const requests = await allRequestsRep();
    return requests;
}


const specRequestSrv = async (requestId , employeeId , role) => {
     if(!mongoose.Types.ObjectId.isValid(requestId)){
        throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const request = await specRequestRep(requestId);

    if(!request){
        throw(createError(STATUS.NOT_FOUND , "Not Found"));
    }

    if((String(request.employeeId) !== String(employeeId)) && role !== "admin"){
        throw(createError(STATUS.NOT_FORBIDDEN , "Not allow"));
    }

    return request;
}

const updateStatusSrv = async (data) => {

    const statusArr = ["open", "in_progress", "resolved", "closed"];

    if(!data.status || !statusArr.includes(data.status)){
        throw(createError(STATUS.BAD_REQUEST , "Please Enter a Valid Status"));
    }

     if(!mongoose.Types.ObjectId.isValid(data.requestId)){
        throw createError(STATUS.BAD_REQUEST , "Not valid mongoId");
    }

    const request = await updateStatusRep(data);

    if(!request){
        throw(createError(STATUS.NOT_FOUND , "Not Found"));
    }

    return request;
}
module.exports = {createRequestServ , employeeRequestsSrv , allRequestsSrv , specRequestSrv , updateStatusSrv};