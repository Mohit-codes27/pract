import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
app.use(express.json());
app.use(cors());
console.log(process.env.MONGO_URI)

// Check if MONGO_URI is set
if (!process.env.MONGO_URI) {
  console.error("Error: MONGO_URI not defined in .env file");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
    process.exit(1);
  });

// Define Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  phone: String,
  city: String,
  companyType: String,
  workField: String,
  role: String,
  address: String,
});

// Create Model
const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "error", message: "Email already in use" });
    }

    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ status: "success", message: "User registered successfully!" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ status: "error", message: "Server error while saving data" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
