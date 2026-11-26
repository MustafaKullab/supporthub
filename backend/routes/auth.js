const express = require("express");
const tryCatch = require("../middlewares/tryCatch");
const upload = require("../middlewares/upload");
const { signupUser , verifyAccount , loginUser , refreshTokens , logoutUser, resendVerification , forgotPassword , resetPassword} = require("../controller/authController");
const { authRateLimit } = require("../utils/rateLimits");
const router = express.Router();



// Signup router 
router.post("/auth/signup" , upload.single("avatar") , authRateLimit, tryCatch(signupUser));

// Verify router 
router.post("/auth/verify" , authRateLimit, tryCatch(verifyAccount));

// Resend Code 
router.post("/auth/resend-verification" , authRateLimit, tryCatch(resendVerification));

// Forgot Password 
router.post("/auth/forgot-password" , authRateLimit, tryCatch(forgotPassword));

// Reset Password 
router.post("/auth/reset-password" , authRateLimit, tryCatch(resetPassword));

// Login router 
router.post("/auth/login" , authRateLimit, tryCatch(loginUser));

// Router to refresh token 
router.post("/auth/refresh" , tryCatch(refreshTokens));

// Router to logout user 
router.post("/auth/logout" , tryCatch(logoutUser));

module.exports = router;