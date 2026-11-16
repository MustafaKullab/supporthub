const STATUS = require("../constants/httpStatus");
const { createEmployee , loginUserServ , refreshTokensSrv } = require("../services/aurhServices");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/createTokens");
const production = process.env.NODE_ENV === "production";

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  const avatar = req.file ? `uploads/${req.file.filename}` : null;

  const user = await createEmployee({ name, email, password, avatar });

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

  return res
    .status(STATUS.CREATED)
    .json({
      success: true,
      data: {user: { name: user.name, email: user.email, avatar: user.avatar }},
    });
};


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

module.exports = {signupUser , loginUser , refreshTokens , logoutUser};