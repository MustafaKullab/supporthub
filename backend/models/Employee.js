const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {isEmail} = require("validator");
const bcrypt = require("bcrypt");
const STATUS = require("../constants/httpStatus");
const createError = require("../utils/createError");

const employeeSchema = new Schema({
    name: {
        type: String,
        required: [true , "Please Enter a Name"],
    },

    email: {
        type: String,
        required: [true , "Please Enter a Email"],
        validate: [isEmail , "Pease Enter a valid Email"],
        unique: true,
        lowercase: true,
    },
    
    passwordHash: {
        type: String,
        required: [true , "Please Enter a Password"],
        minlength: [6, "Password must be equal at least 6 chars"],
    },

    role: {
        type: String,
        enum: ['employee' , 'admin'],
        default: 'employee',
    },

    avatar: {
        type: String,
        default: null,
    },

    verificationCodeHash: {
        type: String,
        default: null,
    },

    verificationCodeExpiresAt: {
        type: Date,
        default: null
    },

    verificationAttempts: {
        type: Number,
        default: 0
    },

    verificationLastSentAt: {
        type: Date,
        default: null
    },
    
    verificationResendCount: {
        type: Number,
        default: 0,
    },
    
    verificationResendWindowStart: {
        type: Date,
        default: null
    },

    isVerified: {
        type: Boolean,
        default: false,
    }
});

// Before save in db 
employeeSchema.pre("save" , async function() {
    if(!this.isModified("passwordHash")) return;

    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash , salt);
});


employeeSchema.statics.login = async function(email , password) {
    const user = await Employee.findOne({email});

    if(!user) throw(createError(STATUS.NOT_FOUND , "Employee is not found, please signup!"));

    const auth = await bcrypt.compare(password , user.passwordHash);

    if(!auth) throw(createError(STATUS.UNAUTHORIZED , "Incorrect Password."));

    return {_id: user._id , name: user.name , email: user.email , role: user.role, avatar: user.avatar , isVerified: user.isVerified};
}

// To prevent Race condition problem 
employeeSchema.set("optimisticConcurrency" , true);

const Employee = mongoose.model("Employee" , employeeSchema);



module.exports = Employee;