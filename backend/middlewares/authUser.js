const jwt = require("jsonwebtoken");
const STATUS = require("../constants/httpStatus");
const Employee = require("../models/Employee");

const authUser = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken)
    return res.status(STATUS.UNAUTHORIZED).json({ success: false });

  jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, decoded) => {
    if (err) return res.status(STATUS.UNAUTHORIZED).json({ success: false });

    try {
      const employee = await Employee.findById(decoded.id);
      if (!employee)
        return res
          .status(STATUS.UNAUTHORIZED)
          .json({ success: false, message: "Employee not found" });

      req.employee = employee;
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = authUser;
