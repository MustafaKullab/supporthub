const express = require("express");
const router = express.Router();
const requestsRouter = require("./requests");
const authRouter = require("./auth");
const commentRouter = require("./comments");

router.use(authRouter);
router.use(requestsRouter);
router.use(commentRouter);

module.exports = router;