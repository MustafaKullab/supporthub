const STATUS = require("../constants/httpStatus");
const handleErrors = require("../utils/handleErrors");
const sendError = require("../utils/sendError");

const handularErrors = (err, req, res, next) => {
  const errors = handleErrors(err);

  let status =
    err.name === "ValidationError"
      ? STATUS.BAD_REQUEST
      : err.code === 11000
        ? STATUS.CONFLICT
        : err.status || STATUS.INTERNAL_SERVER_ERROR;

  return sendError(
    res,
    status,
    err.message || "Something went error",
    errors
  );
};

module.exports = handularErrors;
