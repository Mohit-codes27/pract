import userModel from '../models/user.model.js';


const createUser = async({
    fullName, email, password, phone, city, companyType, workField, role, address
})=>{
    if(!fullName || !email || !password || !phone || !city || !companyType || !workField || !role || !address){
        throw new Error('Please enter all fields');
    }
    const user = userModel.create({
        fullName,
        email,
        password,
        phone,
        city,
        companyType,
        workField,
        role,
        address
    })
    

    return user;
}

export default {
    createUser
}
