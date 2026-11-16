const express = require("express");
const router = require("./routes/router");
const handularErrors = require("./middlewares/handularErrors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const { gerenalRateLimit } = require("./utils/rateLimits");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
];

// use cors
app.use(cors({
    origin: function(origin , callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null , true);
        } else {
             callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

// use helmet 
app.use(helmet())

// Use rate limit 
app.use(gerenalRateLimit);

app.use(router);

app.use(handularErrors);

module.exports = app;