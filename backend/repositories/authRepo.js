const Employee = require("../models/Employee")

const createEmp = async (data) => {
    return await Employee.create({name: data.name , email: data.email , passwordHash: data.password , avatar: data.avatar});
}

const findEmployee = async (email) => {
    return await Employee.findOne({email});
}

const findEmployeeById = async (id) => {
    return await Employee.findById(id);
}

module.exports = {createEmp , findEmployee , findEmployeeById};