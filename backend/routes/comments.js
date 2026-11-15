const express = require("express");
const tryCatch = require("../middlewares/tryCatch");
const authUser = require("../middlewares/authUser");
const { createComment, getComments } = require("../controller/commentController");
const router = express.Router();

// Create Comment 
router.post("/requests/:requestId/comments" , authUser , tryCatch(createComment));

// Get Comments Of Request 
router.get("/requests/:requestId/comments" , authUser , tryCatch(getComments));

module.exports = router;