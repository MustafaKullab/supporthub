const STATUS = require("../constants/httpStatus");
const { createRequestServ , employeeRequestsSrv , allRequestsSrv , specRequestSrv , updateStatusSrv } = require("../services/requestService");

const createRequest = async (req,res) => {
    const {title , description , priority} = req.body;
    const employeeId = req.employee._id;

    const request = await createRequestServ({employeeId , title , description , priority});

    return res.status(STATUS.CREATED).json({success: true , data: {request}});
}



const employeeRequests = async (req,res) => {
    const employeeId = req.employee._id;
    
    const requests = await employeeRequestsSrv(employeeId);
    
    return res.status(STATUS.OK).json({success: true , data: {requests}});
}


const allRequests = async (req,res) => {
    const requests = await allRequestsSrv();
    
    return res.status(STATUS.OK).json({success: true , data: {requests}});
}

const specRequest = async (req,res) => {
    const {requestId} = req.params;
    const employeeId = req.employee._id;
    const role = req.employee.role;

    const request = await specRequestSrv(requestId,employeeId , role);
    
    return res.status(STATUS.OK).json({success: true , data: {request}});
}


const updateStatus = async (req,res) => {
    const {status} = req.body;
    const {requestId} = req.params;
    
    const request = await updateStatusSrv({requestId , status});

    return res.status(STATUS.OK).json({success: true , data: {request}});
}

module.exports = {createRequest , employeeRequests , allRequests , specRequest , updateStatus};