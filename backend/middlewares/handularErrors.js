const STATUS = require("../constants/httpStatus");
const handleErrors = require("../utils/handleErrors");
const sendError = require("../utils/sendError");

const handularErrors = (err, req, res, next) => {

  // اللي ضفناها للمودل بنعرضه بشكل مرتب set في حال التعارض لو انمسك من الخاصية تبعت ال 
  if (err.name === "VersionError") {
    return res.status(STATUS.CONFLICT).json({
      success: false,
      message: "Data has changed. Please try again."
    });
  }

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
