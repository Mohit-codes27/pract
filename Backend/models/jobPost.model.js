import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const jobPostSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: String,
  city: String,
  companyType: String,
  workField: String,
  role: String,
  address: String,
});

jobPostSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {expiresIn: '1d'});
    return token;
}

jobPostSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

jobPostSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const jobPostModel = mongoose.model('user', jobPostSchema)

export default jobPostModel;