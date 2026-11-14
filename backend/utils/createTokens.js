const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
    return jwt.sign({id} , process.env.ACCESS_TOKEN , {expiresIn: "15m"});
}

const createRefreshToken = (id) => {
    return jwt.sign({id} , process.env.REFRESH_TOKEN , {expiresIn: "7d"});
}

module.exports = {createAccessToken , createRefreshToken};