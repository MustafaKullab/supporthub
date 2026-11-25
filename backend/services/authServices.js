const { isEmail } = require("validator");
const mongoose = require("mongoose");
const crypto = require("crypto");
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
const sendEmail = require("../utils/sendEmail");
const generateHashCode = require("../utils/generateHashCode");

const production = process.env.NODE_ENV === "production";

const createEmployee = async (data) => {
  if (!data.name || !data.email || !data.password)
    throw createError(STATUS.BAD_REQUEST, "Something went wrong");

  const employeeExist = await findEmployee(data.email);

  if (employeeExist)
    throw createError(STATUS.CONFLICT, "Email is already used");

  const employee = await createEmp(data);

  const OTPCode = crypto.randomInt(100000, 1000000);
  const hashOTPCode = generateHashCode(OTPCode.toString());

  employee.verificationCodeHash = hashOTPCode;
  employee.verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // End After 10 minutes
  employee.verificationLastSentAt = new Date();
  await employee.save();

  try {
    await sendEmail({
      to: employee.email,
      subject: "Verification account code",
      text: `Verification account code is ${OTPCode}`,
    });
  } catch (error) {
    throw createError(503, "Email delivery failed. Please request a new code");
  }

  return employee;
};


const getMeSrv = async (employeeId) => {
  
  if(!employeeId || !mongoose.isValidObjectId(employeeId)) {
      throw(createError(STATUS.BAD_REQUEST , "Not Valid employee id"));
  }

  const employee = await findEmployeeById(employeeId);

  return employee;
}

const verifyAccountOnce = async (data) => {
  // التاكد من الايميل والكود
  if (
    typeof data.email !== "string" ||
    !isEmail(data.email.trim()) ||
    typeof data.code !== "string" ||
    !/^\d{6}$/.test(data.code)
  ) {
    throw createError(STATUS.BAD_REQUEST, "Invalid verification data");
  }

  data.email = data.email.trim().toLowerCase();

  const employee = await findEmployee(data.email);

  // if employee not found
  if (!employee) throw createError(STATUS.NOT_FOUND, "Employee not found");

  // if account verified
  if (employee.isVerified)
    throw createError(STATUS.BAD_REQUEST, "Account is already verified");

  // if verificationCode Expires end Or not valid verificationCodeExpiresAt
  if (
    employee.verificationCodeExpiresAt <= new Date() ||
    !employee.verificationCodeExpiresAt
  )
    throw createError(STATUS.BAD_REQUEST, "Not valid verification code");

  // if code not correct
  if (
    employee.verificationCodeHash !== generateHashCode(data.code.toString())
  ) {
    employee.verificationAttempts++;

    // if finished attempts
    if (employee.verificationAttempts >= 5) {
      employee.verificationCodeHash = null;
      employee.verificationCodeExpiresAt = null;
      await employee.save();
      throw createError(STATUS.BAD_REQUEST, "Your attempts are finished");
    }

    await employee.save();
    throw createError(STATUS.BAD_REQUEST, "Verification code is not correct");
  }

  employee.verificationCodeHash = null;
  employee.verificationCodeExpiresAt = null;
  employee.verificationAttempts = 0;
  employee.isVerified = true;

  await employee.save();

  return employee;
};

// 409 اللي جهزناه يرجع  Error Handular إذا صار تعارض، بنعيد التحقق مرة واحدة، والدالة بتجلب الموظف من قاعدة البيانات من جديد. وإذا تكرر التعارض الـ
const verifyAccountSrv = async (data) => {
  try {
    return await verifyAccountOnce(data);
  } catch (error) {
    if (error.name === "VersionError") {
      return await verifyAccountOnce(data);
    }

    throw error;
  }
};

const resendVerificationSrv = async (email) => {
  if (typeof email !== "string" || !isEmail(email.trim())) {
    throw createError(STATUS.BAD_REQUEST, "Invalid email");
  }

  email = email.trim().toLowerCase();

  const employee = await findEmployee(email);

  if (!employee || employee.isVerified) return;

  let elapsed = Date.now() - employee.verificationLastSentAt;

  if (employee.verificationLastSentAt && elapsed < 60 * 1000) return;

  elapsed = Date.now() - employee.verificationResendWindowStart;

  if (!employee.verificationResendWindowStart || elapsed >= 60 * 60 * 1000) {
    // employee.verificationResendWindowStart يعني اول مرة
    employee.verificationResendCount = 0;
    employee.verificationResendWindowStart = new Date();
  }

  if (employee.verificationResendCount >= 5) return;

  const OTPCode = crypto.randomInt(100000, 1000000);
  const hashOTPCode = generateHashCode(OTPCode.toString());

  employee.verificationResendCount++;
  employee.verificationCodeHash = hashOTPCode;
  employee.verificationCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  employee.verificationAttempts = 0;
  employee.verificationLastSentAt = new Date();

  try {
    await employee.save();
  } catch (error) {
    // حالة خاصة عشان ما ينمسك بالهاندلر وينكشف انه له ايميل , ما بدنا نكشف اذا اله ايميل
    if (error.name === "VersionError") return;

    throw error;
  }

  try {
    await sendEmail({
      to: employee.email,
      subject: "Verification account code",
      text: `Verification account code is ${OTPCode}`,
    });
  } catch (error) {
    console.error("Verification email delivery failed");
  }
};

const forgotPasswordSrv = async (email) => {
  // فحص القيم المدخلة
  if (!email || typeof email !== "string" || !isEmail(email))
    throw createError(STATUS.BAD_REQUEST, "Not Valid Inputs");

  email = email.trim().toLowerCase();
  const employee = await findEmployee(email);

  // التاكد من الموظف وهل هو مؤكد
  if (!employee || !employee.isVerified) return;

  // فحص الدقيقة
  const now = new Date();

  let elapsed = now - employee.resetPasswordCodeLastSentAt;

  if (employee.resetPasswordCodeLastSentAt && elapsed < 60 * 1000)
    return;

  // فحص نافذة اعادة الارسال المحاولات
  elapsed = now - employee.resetPasswordCodeWindowStartAt;

  if (!employee.resetPasswordCodeWindowStartAt || elapsed >= 60 * 60 * 1000) {
    employee.resetPasswordCodeWindowStartAt = new Date();
    employee.resetPasswordCodeResendCount = 0;
  } else {
    if (employee.resetPasswordCodeResendCount >= 5)
      return;

    employee.resetPasswordCodeResendCount++;
  }

  const resetPasswordCode = crypto.randomInt(100000, 1000000);
  const resetPasswordCodeHash = generateHashCode(resetPasswordCode.toString());

  employee.resetPasswordCode = resetPasswordCodeHash;
  employee.resetPasswordCodeExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  employee.resetPasswordCodeLastSentAt = new Date();
  employee.resetPasswordCodeAttempts = 0;
  
  try {
    await employee.save();
  } catch (error) {
    if (error.name === "VersionError") return;
    throw error;
  }

  try {
    await sendEmail({
      to: employee.email,
      subject: `كود تغيير كلمة المرور`,
      text: `كود تغيير كلمة مرورك هو : ${resetPasswordCode}`,
    });
  } catch (error) {
      console.error("Password reset email sending failed");
  }

  return employee;
};

const resetPasswordOnce = async (email, code, newPassword) => {
  // التحقق من شكل المدخلات
  if (
    !email ||
    !isEmail(email) ||
    !code ||
    typeof code !== "string" ||
    !/^\d{6}$/.test(code) ||
    !newPassword ||
    typeof newPassword !== "string" ||
    newPassword.length < 6
  )
    throw createError(STATUS.BAD_REQUEST, "Not Valid Inputs");

  const employee = await findEmployee(email);

  if(!employee || !employee.isVerified || !employee.resetPasswordCode) throw(createError(STATUS.BAD_REQUEST , "Invalid reset request"));
  // الكود منتهي الصلاحية
  if (
    !employee.resetPasswordCodeExpiresAt ||
    employee.resetPasswordCodeExpiresAt <= new Date()
  )
    throw(createError(STATUS.BAD_REQUEST , "Current code is not valid"));

  if (generateHashCode(code) !== employee.resetPasswordCode) {
    employee.resetPasswordCodeAttempts++;

    if (employee.resetPasswordCodeAttempts >= 5) {
      employee.resetPasswordCode = null;
      employee.resetPasswordCodeExpiresAt = null;

      await employee.save();

      throw createError(STATUS.BAD_REQUEST, "Your attempts is finished");
    }

    await employee.save();
    throw createError(STATUS.BAD_REQUEST, "Code is not correct");
  }

  employee.passwordHash = newPassword;
  employee.resetPasswordCode = null;
  employee.resetPasswordCodeExpiresAt = null;
  employee.resetPasswordCodeAttempts = 0;

  await employee.save();

  return employee;
};

const resetPasswordSrv = async (email , code , newPassword) => {

  try{
    return await resetPasswordOnce(email , code , newPassword);
  } catch(error){
    // هنا بالذات لو صار تعارض لازم نعيد ارسال الدالة بالبيانات الجديدة عشان ما يحسب انه في محاولة اخرى ايضاً لو دخل كود خطأ
    if(error.name === "VersionError") return await resetPasswordOnce(email , code , newPassword);

    throw error;
  }

}

const loginUserServ = async (data) => {
  if (!data.email || !data.password)
    throw createError(STATUS.BAD_REQUEST, "Something went wrong");

  const user = await Employee.login(data.email, data.password);

  if (!user) throw createError(STATUS.NOT_FOUND, "User not found");

  if (!user.isVerified)
    throw createError(STATUS.NOT_FORBIDDEN, "User account is not verified");

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
    throw createError(STATUS.UNAUTHORIZED, "Invalid refresh token");
  }

  const employee = await findEmployeeById(decoded.id);

  if (!employee || !employee.isVerified) {
    throw createError(STATUS.UNAUTHORIZED, "Employee not found");
  }

  const accessToken = createAccessToken(employee._id);

  return accessToken;
};

module.exports = {
  createEmployee,
  getMeSrv,
  verifyAccountSrv,
  resendVerificationSrv,
  forgotPasswordSrv,
  resetPasswordSrv,
  loginUserServ,
  refreshTokensSrv,
};
