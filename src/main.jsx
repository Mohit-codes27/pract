import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import "./index.css";

// Context Provider (only for user data)
import UserContext from "./Components/Context/UserContext.jsx";

// Your route components
import About from "./Components/About/About.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp.jsx";
import { 
  Contact, 
  ProfilePage, 
  Setting, 
  SignUp2, 
  Information, 
  JobPost, 
  InternshipDetail, 
  JobDetail, 
  CourseDetail, 
  AbroadPage, 
  MentorPage, 
  BookPage, 
  PerformanceTracker,
  JobsList
} from "./Components/index.js";
import Login2 from "./Components/Login2.jsx";
import ProfilePage2 from "./Components/Profile/profilePage2.jsx";
import InternshipList from "./Components/Dropdowns/Intern/InternshipList.jsx"
import CourseList from "./Components/Dropdowns/Course/CourseList.jsx"
import PrivacyPage from "./Components/PrivacyPolicy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "profile", element: <ProfilePage/> },
      { path: "employee-signup", element: <SignUp2/>},
      { path: "employee-login", element: <Login2/> },
      { path: "employee-profile", element: <ProfilePage2/> },
      { path: "contact", element: <Contact /> },
      { path: "setting", element: <Setting /> },
      { path: "information", element: <Information /> },
      { path: "job-post", element: <JobPost /> },
      // Job related routes
      { path: "jobs", element: <JobsList /> }, // List of all jobs
      { path: "job/:id", element: <JobDetail /> }, // Individual job detail by MongoDB _id
      
      // Internship routes
      { path: "internships", element: <InternshipList/> },
      { path: "internship/:id", element: <InternshipDetail /> },
      { path: "abroad", element: <AbroadPage /> },
      { path: "mentor", element: <MentorPage /> },
      { path: "book", element: <BookPage /> },
      { path: "performance", element: <PerformanceTracker /> },
      { path: "courses", element: <CourseList /> },
      { path: "course/:id", element: <CourseDetail /> },
      { path: "privacy", element: <PrivacyPage /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserContext>
        <RouterProvider router={router} />
      </UserContext>
    </Provider>
  </React.StrictMode>
);