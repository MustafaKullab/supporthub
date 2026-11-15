const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    requestId: {
        type: Schema.Types.ObjectId,
        ref: "Request",
        required: [true , "Request ID is required"],
    },
    
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: [true , "Employee ID is required"],
    },

    body: {
        type: String,
        trim: true,
        required: [true , "Please Enter a Valid Comment"],
    },


} , {timestamps: true});


const Comment = mongoose.model("Comment" , commentSchema);

module.exports = Comment;