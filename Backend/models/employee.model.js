import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const employeeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  gender: String,
  languages: String,
  type: String,
  resume: String,
});

employeeSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {expiresIn: '1d'});
    return token;
}

employeeSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

employeeSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const employeeModel = mongoose.model('employee', employeeSchema)

export default employeeModel;