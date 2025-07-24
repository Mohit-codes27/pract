import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Employee from "./models/employee.model.js";
import userService from "./services/user.service.js";
import employeeService from "./services/employee.service.js";
import jobPostService from "./services/job.service.js";
import blacklistTokenModel from "./models/blacklist.model.js";
import cookieParser from "cookie-parser";
import authmiddleware from "./middlewares/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { upload } from "./middlewares/multer.middleware.js";
import Job from "./models/jobPost.model.js";


dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

const { authUser, authEmployee, authAnyUser } = authmiddleware;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.warn("No file path provided for upload.");
      return null;
    }

    // Upload to Cloudinary with resource_type "raw" for non-image files (like PDF)
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
    });

    // Delete local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return result; // Contains .url, .secure_url, etc.
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Delete local file even if upload failed
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

// ===== Employer Signup/Login =====

app.post("/signup", async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      city,
      companyType,
      workField,
      role,
      address,
    } = req.body;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await User.hashPassword(password);

    const user = await userService.createUser({
      fullName,
      email,
      password: hashPassword,
      phone,
      city,
      companyType,
      workField,
      role,
      address,
    });

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ token, user });
});

// ===== Employee Signup/Login =====

app.post("/employee-signup", async (req, res) => {
  try {
    const { fullName, email, password, phone, city, gender, languages, type } = req.body;

    const isUserExists = await Employee.findOne({ email });
    if (isUserExists) return res.status(400).json({ message: "Employee already exists" });

    const hashPassword = await Employee.hashPassword(password);

    const user = await employeeService.createEmployee({
      fullName,
      email,
      password: hashPassword,
      phone,
      city,
      gender,
      languages,
      type,
    });

    const token = user.generateAuthToken();
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/employee-login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

  const token = user.generateAuthToken();
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.status(200).json({ token, user });
});

// ===== Shared Logout and Auth Routes =====

app.get("/logout", authAnyUser, async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/me", authAnyUser, (req, res) => {
  if (req.user) {;
    return res.json({ ...req.user.toObject(), userType: "employer" });
  } else if (req.employee) {
    // Option 1: Return nothing or 401 for employees
    return res.status(401).json({ message: "Unauthorized" });
    // Option 2: If you want to allow, return userType: "employee"
    // return res.json({ ...req.employee.toObject(), userType: "employee" });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
});

// ===== Profile Update Routes =====

app.put("/profile", authUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const updateData = req.body;
    delete updateData.email;
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/profile", authUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/employee-profile", authEmployee, async (req, res) => {
  try {
    const userId = req.employee._id;
    const updateData = req.body;
    delete updateData.email;
    delete updateData.password;

    const updatedUser = await Employee.findByIdAndUpdate(userId, { $set: updateData }, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/employee-profile", authEmployee, async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee._id).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resume upload endpoint for employee
app.post(
  "/employee-profile/upload-resume",
  authEmployee,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      if (!req.file.mimetype.includes("pdf")) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({ message: "Only PDF files are allowed" });
      }

      const cloudResult = await uploadOnCloudinary(req.file.path);

      if (!cloudResult || !cloudResult.secure_url) {
        return res.status(500).json({ message: "Cloudinary upload failed" });
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.employee._id,
        { $set: { resume: cloudResult.secure_url } },
        { new: true }
      );

      res.json({
        message: "Resume uploaded successfully",
        resumeUrl: cloudResult.secure_url,
        employee: updatedEmployee,
      });
    } catch (error) {
      console.error("Resume upload error:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

app.delete("/employee-profile/delete-resume", authEmployee, async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.employee._id, { $set: { resume: "" } });
    res.json({ message: "Resume deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/post-job", authUser, async (req, res) => {
  try {
    const {
      company,
      jobTitle,
      skills,
      location,
      salary,
      experience,
      jobType,
      postedOn,
      description
    } = req.body;
    const user = await User.findById(req.user._id).select("-password");


    const job = await jobPostService.createJobPost({
      companyId: user._id,
      company,
      jobTitle,
      skills,
      location,
      salary,
      experience,
      jobType,
      postedOn,
      description
    });
    await job.save();
    
    res.status(201).json({ message: "Job posted successfully!!!", job });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Failed to post job", error: error.message });
  }
});

app.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedOn: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
});

// Add this route to your main server file (after your existing /jobs route)

app.get("/jobs/:id", async (req, res) => {
  const { id } = req.params

  try {
    const job = await Job.findOne({ _id: id }) // safer than findById

    if (!job) {
      console.log("Job not found with ID:", id)
      return res.status(404).json({ message: "Job not found" })
    }

    res.json(job)
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ message: "Failed to fetch job", error: error.message })
  }
})

app.get("/my-jobs", authUser, async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user._id })
      .sort({ postedOn: -1 }); // Latest jobs first
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching user jobs:", error);
    res.status(500).json({ message: "Failed to fetch your jobs", error: error.message });
  }
});

app.delete("/jobs/:id", authUser, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    // Check if the user is the one who posted this job
    if (job.companyId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }
    
    await Job.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Failed to delete job", error: error.message });
  }
});




// ===== Start Server =====
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
