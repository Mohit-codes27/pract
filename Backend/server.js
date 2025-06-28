// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import User from "./models/user.model.js"; // Adjust the path as necessary
// import Employee from "./models/employee.model.js"; // Adjust the path as necessary
// import userService from "./services/user.service.js"; // Adjust the path as necessary
// import employeeService from "./services/employee.service.js"; // Adjust the path as necessary
// import blacklistTokenModel from "./models/blacklist.model.js"; // Adjust the path as necessary
// // import authUser from "./middlewares/auth.middleware.js"; // Adjust the path as necessary
// import cookieParser from "cookie-parser"; // Import cookie-parser
// import authmiddleware from "./middlewares/auth.middleware.js";

// dotenv.config({ path: "./.env" });

// const app = express();
// app.use(express.json());
// app.use(cookieParser()); // Use cookie-parser to parse cookies
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Adjust this to your frontend URL
//     credentials: true, // Allow cookies to be sent with requests
//   })
// );

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("DB Connection Error:", err));

// // Signup Route
// app.post("/signup", async (req, res) => {
//   try {
//     const {
//       fullName,
//       email,
//       password,
//       phone,
//       city,
//       companyType,
//       workField,
//       role,
//       address,
//     } = req.body;

//     const isUserExists = await User.findOne({ email });
//     if (isUserExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashPassword = await User.hashPassword(password);

//     const user = await userService.createUser({
//       fullName,
//       email,
//       password: hashPassword,
//       phone,
//       city,
//       companyType,
//       workField,
//       role,
//       address,
//     });

//     const token = user.generateAuthToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false, // true in production with HTTPS
//     });
//     res.status(201).json({ token, user });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = user.generateAuthToken();
//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false, // true in production with HTTPS
//   });
//   res.status(200).json({ token, user });
// });

// app.get("/logout", authmiddleware.authUser, async (req, res) => {
//   res.clearCookie("token");
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//   await blacklistTokenModel.create({ token });
//   res.status(200).json({ message: "Logged out successfully" });
// });

// app.get("/profile", authmiddleware.authUser, async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/me", authmiddleware.authUser, (req, res) => {
//   if (req.user) {
//     return res.json(req.user); // employer
//   } else if (req.employee) {
//     return res.json(req.employee); // employee
//   } else {
//     return res.status(401).json({ message: "Unauthorized" });
//   } // req.user is set by authUser middleware
// });

// // Update user profile
// app.put("/profile", authmiddleware.authUser, async (req, res) => {
//   try {
//     // req.user is set by authUser middleware
//     const userId = req.user._id;
//     const updateData = req.body;

//     // Prevent updating email or password here if you want
//     delete updateData.email;
//     delete updateData.password;

//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updateData },
//       { new: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.post("/employee-signup", async (req, res) => {
//   try {
//     const { fullName, email, password, phone, city, gender, languages, type } =
//       req.body;

//     const isUserExists = await Employee.findOne({ email });
//     if (isUserExists) {
//       return res.status(400).json({ message: "Employee already exists" });
//     }

//     const hashPassword = await Employee.hashPassword(password);

//     const user = await employeeService.createEmployee({
//       fullName,
//       email,
//       password: hashPassword,
//       phone,
//       city,
//       gender,
//       languages,
//       type,
//     });

//     const token = user.generateAuthToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       sameSite: "lax",
//       secure: false, // true in production with HTTPS
//     });
//     res.status(201).json({ token, user });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.post("/employee-login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await Employee.findOne({ email });

//   if (!user) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const isMatch = await user.comparePassword(password);

//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid email or password" });
//   }

//   const token = user.generateAuthToken();
//   res.cookie("token", token, {
//     httpOnly: true,
//     sameSite: "lax",
//     secure: false, // true in production with HTTPS
//   });
//   res.status(200).json({ token, user });
// });

// app.get("/logout", authmiddleware.authEmployee, async (req, res) => {
//   res.clearCookie("token");
//   const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
//   await blacklistTokenModel.create({ token });
//   res.status(200).json({ message: "Logged out successfully" });
// });

// app.get("/me", authmiddleware.authEmployee, (req, res) => {
//   res.json(req.employee); // req.user is set by authUser middleware
// });

// // Update user profile
// app.put("/employee-profile", authmiddleware.authEmployee, async (req, res) => {
//   try {
//     // req.user is set by authUser middleware
//     const userId = req.employee._id;
//     const updateData = req.body;

//     // Prevent updating email or password here if you want
//     delete updateData.email;
//     delete updateData.password;

//     const updatedUser = await Employee.findByIdAndUpdate(
//       userId,
//       { $set: updateData },
//       { new: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// app.get("/employee-profile", authmiddleware.authEmployee, async (req, res) => {
//   try {
//     const employee = await Employee.findById(req.employee._id).select(
//       "-password"
//     );
//     if (!employee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }
//     res.status(200).json(employee);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import Employee from "./models/employee.model.js";
import userService from "./services/user.service.js";
import employeeService from "./services/employee.service.js";
import blacklistTokenModel from "./models/blacklist.model.js";
import cookieParser from "cookie-parser";
import authmiddleware from "./middlewares/auth.middleware.js";

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
  if (req.user) {
    return res.json({ ...req.user.toObject(), role: "employer" });
  } else if (req.employee) {
    return res.json({ ...req.employee.toObject(), role: "employee" });
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

// ===== Start Server =====
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
