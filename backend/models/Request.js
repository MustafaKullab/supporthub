const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true , "Employee ID is required"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Request title is required"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Request description is required"],
      minlength: [15, "Min length of description is 15 characters"],
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },
  },
  { timestamps: true }
);


const Request = mongoose.model("Request" , requestSchema);

module.exports = Request;