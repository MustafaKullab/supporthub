const express = require("express");
const tryCatch = require("../middlewares/tryCatch");
const authUser = require("../middlewares/authUser");
const router = express.Router();
const { createRequest,employeeRequests , allRequests , specRequest , updateStatus } = require("../controller/requestController");
const authAdmin = require("../middlewares/authAdmin");

// Create new request
router.post("/requests" , authUser, tryCatch(createRequest));

// Get My Requests
router.get("/requests/my" , authUser , tryCatch(employeeRequests));

// Get All Requests
router.get("/requests" , authUser , authAdmin("admin") , tryCatch(allRequests));

// Get Specific Request
router.get("/requests/:requestId" , authUser , tryCatch(specRequest));

// Update status of request
router.patch("/requests/:requestId/status" , authUser , authAdmin("admin") , tryCatch(updateStatus));
module.exports = router;