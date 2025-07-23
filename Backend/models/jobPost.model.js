import mongoose from 'mongoose';


const jobPostSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  company: String,
  jobTitle: String,
  skills: {
        type: [String],
        required: true,
    },
  location: String,
  salary: String,
  experience: String,
  jobType: String,
  postedOn: String,
  desecription: String
});

const jobPostModel = mongoose.model('jobPost', jobPostSchema)

export default jobPostModel;