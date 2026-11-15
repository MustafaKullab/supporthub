const Request = require("../models/Request");

const createRequestRep = async (data) => {
  const request = await Request.create({
    employeeId: data.employeeId,
    title: data.title,
    description: data.description,
    priority: data.priority,
    status: data.status,
  });

  return request;
};


const employeeRequestsRep = async (employeeId) => {
    const requests = Request.find({employeeId});

    return requests;
}

const allRequestsRep = async () => {
    const requests = Request.find();

    return requests;
}

const specRequestRep = async (requestId) => {
  const request = Request.findById(requestId);

  return request;
}


const updateStatusRep = async (data) => {
  const request = Request.findByIdAndUpdate(data.requestId , {status: data.status} , {new: true});
  return request;
}

const getRequestById = async (requestId) => {
  return await Request.findById(requestId);
}

module.exports = {createRequestRep , employeeRequestsRep , allRequestsRep , specRequestRep , updateStatusRep , getRequestById};
 