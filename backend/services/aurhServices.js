const STATUS = require("../constants/httpStatus");
const Employee = require("../models/Employee");
const { findUser, createEmp } = require("../repositories/authRepo");
const createError = require("../utils/createError");

const createEmployee = async (data) => {

    if(!data.name || !data.email || !data.password) throw(createError(STATUS.BAD_REQUEST , "Something went wrong"));
    
    const userExist = await findUser(data.email);
    
    if(userExist) throw(createError(STATUS.CONFLICT , "Email is already used"));
    
    const user = await createEmp(data);
        
    return user;
}

const loginUserServ = async (data) => {

    if(!data.email || !data.password) throw(createError(STATUS.BAD_REQUEST , "Something went wrong"));

    const user = await Employee.login(data.email , data.password);

    if(!user) throw(createError(404 , "Something went wrong"));

    return user;
}

module.exports = {createEmployee , loginUserServ};