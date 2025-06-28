import employeeModel from '../models/employee.model.js';


const createEmployee = async({
    fullName, email, password, phone, city, gender, languages, type
})=>{
    if(!fullName || !email || !password || !phone || !city || !gender || !languages || !type ){
        throw new Error('Please enter all fields');
    }
    const employee = employeeModel.create({
        fullName,
        email,
        password,
        phone,
        city,
        gender,
        languages,
        type,
    })
    

    return employee;
}

export default {
    createEmployee
}
