const Employee = require("../models/Employee")

const createEmp = async (data) => {
    return await Employee.create({name: data.name , email: data.email , passwordHash: data.password , avatar: data.avatar});
}

const findUser = async (email) => {
    return await Employee.findOne({email});
}

module.exports = {createEmp , findUser};