const express = require("express");
const tryCatch = require("../middlewares/tryCatch");
const upload = require("../middlewares/upload");
const { signupUser , loginUser } = require("../controller/authController");
const router = express.Router();



// Signup router 
router.post("/auth/signup" , upload.single("avatar") , tryCatch(signupUser));

// Login router 
router.post("/auth/login" , tryCatch(loginUser));

module.exports = router;