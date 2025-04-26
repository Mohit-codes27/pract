// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InternshipFilter from "../Dropdowns/Intern/internFilter";

// const About = () => {
//   const [showInternships, setShowInternships] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
//       {/* Logo and Company Name */}
//       <div className="flex items-center mb-4">
//         <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">Logo</div>
//         <h1 className="text-lg font-semibold ml-4">Company Name</h1>
//       </div>

//       {/* Business Development Section */}
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-blue-600">Business Development</h2>
//         <p className="text-gray-600">Biggest font size heading</p>
//         <p className="text-gray-500">Smaller event markers, allocation details</p>
//       </div>

//       {/* Detailed Sections */}
//       <div className="border-t pt-4">
//         <h3 className="text-lg font-bold text-gray-700">Details</h3>
//         <p className="text-gray-600">Heading with bold and hot text</p>
//         <ul className="list-disc pl-5 text-gray-600">
//           <li>Point 1</li>
//           <li>Point 2</li>
//           <li>Point 3</li>
//         </ul>
//       </div>

//       {/* Job Listings Section */}
//       <div className="mt-6 border-t pt-4 cursor-pointer" onClick={() => setShowInternships(true)}>
//         <h3 className="text-lg font-bold text-blue-500">(25%) Job Listings</h3>
//         <p className="text-gray-600">Consisting of offers and job cards</p>
//         <div className="mt-4 border p-4 rounded-lg shadow-sm bg-gray-100">
//           <p className="text-gray-700">Live Job Design</p>
//         </div>
//       </div>

//       {/* Internship Filter Section */}
//       {showInternships && <InternshipFilter />}
//     </div>
//   );
// };

// export default About;


// import { useState, useEffect } from "react"
// import { useForm } from "react-hook-form"

// const jobSkillMap = {
//   "Frontend Developer": ["React", "HTML", "CSS", "JavaScript"],
//   "Backend Developer": ["Node.js", "Express", "MongoDB", "SQL"],
//   "UI/UX Designer": ["Figma", "Adobe XD", "User Research"],
//   "Marketing Manager": ["SEO", "Google Ads", "Content Writing"],
//   "Sales Executive": ["CRM", "Cold Calling", "Lead Generation"],
// }

// function JobPostForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       skillOption: "",
//       jobTitle: "",
//       skills: "",
//     },
//   })

//   const [selectedSkills, setSelectedSkills] = useState([])
//   const [customSkills, setCustomSkills] = useState("")

//   const selectedTitle = watch("jobTitle")
//   const skillOption = watch("skillOption")

//   // Update skills when job title changes and auto-fill is selected
//   useEffect(() => {
//     if (selectedTitle && skillOption === "map") {
//       const skills = jobSkillMap[selectedTitle] || []
//       setSelectedSkills(skills)
//       setValue("skills", skills.join(","))
//     }
//   }, [selectedTitle, skillOption, setValue])

//   const handleJobTitleChange = (e) => {
//     const value = e.target.value
//     setValue("jobTitle", value)

//     if (skillOption === "map") {
//       const skills = jobSkillMap[value] || []
//       setSelectedSkills(skills)
//       setValue("skills", skills.join(","))
//     }
//   }

//   const handleSkillOptionChange = (e) => {
//     const value = e.target.value
//     setValue("skillOption", value)

//     if (value === "map") {
//       const skills = jobSkillMap[selectedTitle] || []
//       setSelectedSkills(skills)
//       setValue("skills", skills.join(","))
//     } else {
//       setSelectedSkills([])
//       setValue("skills", customSkills)
//     }
//   }

//   const onCustomSkillChange = (e) => {
//     const value = e.target.value
//     setCustomSkills(value)
//     setValue("skills", value)
//   }

//   const onSubmit = (data) => {
//     console.log("Job Post Data:", data)
//     // Here you would typically send the data to your backend
//   }

//   return (
//     <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
//         <div className="p-8">
//           <h2 className="text-2xl font-bold text-center mb-6">Post a Job</h2>

//           <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-4">
//               <label htmlFor="company" className="block text-gray-700 mb-1">
//                 Company Name
//               </label>
//               <input
//                 id="company"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter Company Name"
//                 {...register("company", { required: "Company name is required." })}
//               />
//               {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="jobTitle" className="block text-gray-700 mb-1">
//                 Job Title
//               </label>
//               <select
//                 id="jobTitle"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 {...register("jobTitle", { required: "Job title is required." })}
//                 onChange={handleJobTitleChange}
//               >
//                 <option value="">Select Job Title</option>
//                 {Object.keys(jobSkillMap).map((title) => (
//                   <option key={title} value={title}>
//                     {title}
//                   </option>
//                 ))}
//               </select>
//               {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="skillOption" className="block text-gray-700 mb-1">
//                 Choose Skill Entry Option
//               </label>
//               <select
//                 id="skillOption"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 {...register("skillOption", { required: "Skill option is required." })}
//                 onChange={handleSkillOptionChange}
//               >
//                 <option value="">Select Option</option>
//                 <option value="map">Auto Fill from Job Title</option>
//                 <option value="custom">Enter Manually</option>
//               </select>
//               {errors.skillOption && <p className="text-red-500 text-sm">{errors.skillOption.message}</p>}
//             </div>

//             {/* Skills section - conditionally rendered based on skillOption */}
//             <div className="mb-4">
//               <input type="hidden" {...register("skills")} />

//               {skillOption === "map" && (
//                 <div className="p-4 border rounded-md bg-gray-50">
//                   <label className="block text-gray-700 mb-2">Auto-Filled Skills</label>
//                   <div className="mt-2">
//                     {selectedSkills.length > 0 ? (
//                       <div className="flex flex-wrap gap-2">
//                         {selectedSkills.map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-sm">Select a job title to see skills</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {skillOption === "custom" && (
//                 <div className="p-4 border rounded-md bg-gray-50">
//                   <label htmlFor="customSkills" className="block text-gray-700 mb-1">
//                     Enter Skills (comma separated)
//                   </label>
//                   <input
//                     id="customSkills"
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
//                     placeholder="e.g. Python, Django, REST API"
//                     value={customSkills}
//                     onChange={onCustomSkillChange}
//                   />
//                 </div>
//               )}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="location" className="block text-gray-700 mb-1">
//                 Location
//               </label>
//               <input
//                 id="location"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter Location"
//                 {...register("location", { required: "Location is required." })}
//               />
//               {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="salary" className="block text-gray-700 mb-1">
//                 Salary
//               </label>
//               <input
//                 id="salary"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter Salary"
//                 {...register("salary", { required: "Salary is required." })}
//               />
//               {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="experience" className="block text-gray-700 mb-1">
//                 Experience
//               </label>
//               <input
//                 id="experience"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="Enter Experience (e.g. 2-4 years)"
//                 {...register("experience", { required: "Experience is required." })}
//               />
//               {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="jobType" className="block text-gray-700 mb-1">
//                 Job Type
//               </label>
//               <input
//                 id="jobType"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="e.g. Full-Time, Part-Time, Remote"
//                 {...register("jobType", { required: "Job type is required." })}
//               />
//               {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="postedOn" className="block text-gray-700 mb-1">
//                 Posted On
//               </label>
//               <input
//                 id="postedOn"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 type="date"
//                 {...register("postedOn", { required: "Posting date is required." })}
//               />
//               {errors.postedOn && <p className="text-red-500 text-sm">{errors.postedOn.message}</p>}
//             </div>

//             <div className="mb-4">
//               <label htmlFor="description" className="block text-gray-700 mb-1">
//                 Job Description
//               </label>
//               <textarea
//                 id="description"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 rows={5}
//                 placeholder="Enter detailed job description"
//                 {...register("description", { required: "Job description is required." })}
//               ></textarea>
//               {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             >
//               Post Job
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default JobPostForm

import { useState } from "react"
import { useForm } from "react-hook-form"

function JobPostForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: "",
      skills: "",
    },
  })

  const [customSkills, setCustomSkills] = useState("")

  const onCustomSkillChange = (e) => {
    const value = e.target.value
    setCustomSkills(value)
    setValue("skills", value)
  }

  const onSubmit = (data) => {
    console.log("Job Post Data:", data)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[#0a66c2]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Post a Job</h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-1">
                Company Name
              </label>
              <input
                id="company"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Company Name"
                {...register("company", { required: "Company name is required." })}
              />
              {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="jobTitle" className="block font-bold text-gray-700 mb-1">
                Job Title
              </label>
              <input
                id="jobTitle"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Job Title"
                {...register("jobTitle", { required: "Job title is required." })}
              />
              {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="customSkills" className="block font-bold text-gray-700 mb-1">
                Enter Required Skills (comma separated)
              </label>
              <input
                id="customSkills"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 mt-2"
                placeholder="e.g. Python, Django, REST API"
                value={customSkills}
                onChange={onCustomSkillChange}
              />
              <input type="hidden" {...register("skills", { required: "Skills are required." })} />
              {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="location" className="block font-bold text-gray-700 mb-1">
                Location
              </label>
              <input
                id="location"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Location"
                {...register("location", { required: "Location is required." })}
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="salary" className="block font-bold text-gray-700 mb-1">
                Salary
              </label>
              <input
                id="salary"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Salary"
                {...register("salary", { required: "Salary is required." })}
              />
              {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="experience" className="block font-bold text-gray-700 mb-1">
                Experience
              </label>
              <input
                id="experience"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Experience (e.g. 2-4 years)"
                {...register("experience", { required: "Experience is required." })}
              />
              {errors.experience && <p className="text-red-500 text-sm">{errors.experience.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="jobType" className="block font-bold text-gray-700 mb-1">
                Job Type
              </label>
              <input
                id="jobType"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="e.g. Full-Time, Part-Time, Remote"
                {...register("jobType", { required: "Job type is required." })}
              />
              {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="postedOn" className="block font-bold text-gray-700 mb-1">
                Posted On
              </label>
              <input
                id="postedOn"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="date"
                {...register("postedOn", { required: "Posting date is required." })}
              />
              {errors.postedOn && <p className="text-red-500 text-sm">{errors.postedOn.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block font-bold text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={5}
                placeholder="Enter detailed job description"
                {...register("description", { required: "Job description is required." })}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Post Job
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default JobPostForm
