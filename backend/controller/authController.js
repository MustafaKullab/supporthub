const STATUS = require("../constants/httpStatus");
const { createEmployee , verifyAccountSrv , loginUserServ , refreshTokensSrv, resendVerificationSrv , forgotPasswordSrv , resetPasswordSrv } = require("../services/authServices");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createTokens");
const production = process.env.NODE_ENV === "production";

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  const avatar = req.file ? `uploads/${req.file.filename}` : null;

  const user = await createEmployee({ name, email, password, avatar });

  return res
    .status(STATUS.CREATED)
    .json({
      success: true,
      data: {user: {id: user._id, name: user.name, email: user.email, avatar: user.avatar }},
    });
};



const verifyAccount = async (req,res) => {
  const {email , code} = req.body;

  await verifyAccountSrv({email,code});

  return res.status(STATUS.OK).json({success: true});
}


const resendVerification = async (req,res) => {
  const {email} = req.body;

  await resendVerificationSrv(email);

  return res.status(STATUS.OK).json({success: true , message: "If eligible, a verification code will be sent"});
}

const forgotPassword = async (req,res)=> {
  const {email} = req.body;

  await forgotPasswordSrv(email);

  return res.status(STATUS.OK).json({success: true , message: "If eligible, a reset password code will be sent"});
}


const resetPassword = async (req,res) => {
  const {email , code , newPassword} = req.body;

  await resetPasswordSrv(email , code , newPassword);
  return res.status(STATUS.OK).json({success: true});
}

const loginUser = async (req,res) => {
    const {email , password} = req.body;

    const user = await loginUserServ({email , password});

  const accessToken = createAccessToken(user._id);
  const refreshToken = createRefreshToken(user._id);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: production ? "none" : "lax",
    secure: production,
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: production ? "none" : "lax",
    secure: production,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(STATUS.OK).json({success: true , data:{user}});
}


const refreshTokens = async (req,res) => {
  const {refreshToken} = req.cookies;

  const accessToken = await refreshTokensSrv(refreshToken);

  if(accessToken){
    res.cookie("accessToken" , accessToken , {httpOnly: true , secure: production , sameSite: production ? "none" : "lax", maxAge: 15 * 60 * 1000});    
    
    return res.status(STATUS.OK).json({success: true});
  }
}


const logoutUser = async (req,res) => {
  res.clearCookie("accessToken" , {httpOnly: true , secure: production ,sameSite: production ? "none" : "lax"});
  res.clearCookie("refreshToken" , {httpOnly: true , secure: production ,sameSite: production ? "none" : "lax"});


  return res.status(STATUS.OK).json({success: true});
}

module.exports = {signupUser , verifyAccount , resendVerification , forgotPassword , resetPassword , loginUser , refreshTokens , logoutUser};