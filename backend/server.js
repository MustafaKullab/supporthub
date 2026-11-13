require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database Connected Successfully");
    app.listen(process.env.PORT , ()=>{
        console.log(`Server is listening now on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
});