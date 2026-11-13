const express = require("express");
const router = express.Router();
const requestsRouter = require("./requests");

router.use(requestsRouter);

module.exports = router;