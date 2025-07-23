import Job from '../models/jobPost.model.js';


const createJobPost = async({
    companyId, company, jobTitle, skills, location, salary, experience, jobType, postedOn, description
})=>{
    if(!company || !jobTitle || !skills || !location || !salary || !experience || !jobType || !postedOn || !description){
        throw new Error('Please enter all fields');
    }
    const job = Job.create({
        companyId,
        company,
        jobTitle,
        skills,
        location,
        salary,
        experience,
        jobType,
        postedOn,
        description
    })
    

    return job;
}

export default {
    createJobPost
}
