const crypto = require("crypto");

const generateHashCode = (OTPCode) => {
    return crypto.createHmac("sha256" , process.env.HMAC_SECRET).update(OTPCode).digest("hex");
}

module.exports = generateHashCode;