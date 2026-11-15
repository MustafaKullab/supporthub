const express = require("express");
const router = express.Router();
const requestsRouter = require("./requests");
const authRouter = require("./auth");

router.use(requestsRouter);
router.use(authRouter);

module.exports = router;