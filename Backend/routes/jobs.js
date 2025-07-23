import express from "express";
import Job from "../models/jobPost.model";
const router = express.Router();

router.post("/post-job", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to post job", error });
  }
});

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedOn: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
});

export default router;
