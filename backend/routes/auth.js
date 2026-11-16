const express = require("express");
const tryCatch = require("../middlewares/tryCatch");
const upload = require("../middlewares/upload");
const { signupUser , loginUser , refreshTokens , logoutUser } = require("../controller/authController");
const { authRateLimit } = require("../utils/rateLimits");
const router = express.Router();



// Signup router 
router.post("/auth/signup" , upload.single("avatar") , tryCatch(signupUser));

// Login router 
router.post("/auth/login" , authRateLimit, tryCatch(loginUser));

// Router to refresh token 
router.post("/auth/refresh" , tryCatch(refreshTokens));

// Router to logout user 
router.post("/auth/logout" , tryCatch(logoutUser));

module.exports = router;