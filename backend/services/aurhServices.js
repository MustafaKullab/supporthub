const jwt = require("jsonwebtoken");
const STATUS = require("../constants/httpStatus");
const Employee = require("../models/Employee");
const {
  findEmployee,
  createEmp,
  findEmployeeById,
} = require("../repositories/authRepo");
const createError = require("../utils/createError");
const { createAccessToken } = require("../utils/createTokens");

const production = process.env.NODE_ENV === "production";

const createEmployee = async (data) => {
  if (!data.name || !data.email || !data.password)
    throw createError(STATUS.BAD_REQUEST, "Something went wrong");

  const userExist = await findEmployee(data.email);

  if (userExist) throw createError(STATUS.CONFLICT, "Email is already used");

  const user = await createEmp(data);

  return user;
};

const loginUserServ = async (data) => {
  if (!data.email || !data.password)
    throw createError(STATUS.BAD_REQUEST, "Something went wrong");

  const user = await Employee.login(data.email, data.password);

  if (!user) throw createError(404, "Something went wrong");

  return user;
};

const refreshTokensSrv = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(STATUS.UNAUTHORIZED, "Refresh token is not exist");
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
  } catch (err) {
    throw createError(STATUS.UNAUTHORIZED, "Refresh token is not valid");
  }

  if (
    !decoded ||
    typeof decoded !== "object" ||
    !mongoose.isValidObjectId(decoded.id)
  ) {

    throw createError(
      STATUS.UNAUTHORIZED,
      "Invalid refresh token"
    );
  }

  const employee = await findEmployeeById(decoded.id);

  if (!employee) {
    throw createError(STATUS.UNAUTHORIZED, "Employee not found");
  }

  const accessToken = createAccessToken(employee._id);

  return accessToken;
};

module.exports = { createEmployee, loginUserServ, refreshTokensSrv };
