# Intern-Back Pract (React + Vite + Node.js + MongoDB)

A full-stack internship and job portal supporting both employer and employee roles. This project is built with React (Vite), Redux, Node.js, Express, MongoDB, and Cloudinary for file uploads. It provides a modern, responsive UI and robust backend for managing internships, jobs, profiles, and applications.

---

## Features

- **Employer and Employee Authentication:**  
  Secure login and registration for both employers and employees using JWT and cookies.

- **Profile Management:**  
  Both employers and employees can manage their profiles, including updating personal information and uploading resumes (for employees).

- **Resume Upload:**  
  Employees can upload their resumes in PDF format, which are stored securely on Cloudinary. Users can view, delete, and re-upload their resumes from their profile page.

- **Role-Based Protected Routes:**  
  Access to certain pages and actions is restricted based on user role (employer or employee).

- **Redux State Management:**  
  Application state is managed using Redux Toolkit for predictable and scalable state handling.

- **Responsive UI:**  
  Built with Tailwind CSS for a clean, mobile-friendly interface.

- **Error Handling and User Feedback:**  
  User-friendly error messages and feedback for all major actions.

- **Modern React Patterns:**  
  Uses React Context, hooks, and Redux for state and context management.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/intern-back-pract.git
cd intern-back-pract/pract
```

### 2. Install Dependencies

```sh
npm install
cd Backend
npm install
```

### 3. Environment Variables

Create a `.env` file in `/Backend` with:

```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the Backend

```sh
cd Backend
npm run dev
```

### 5. Start the Frontend

```sh
cd ..
npm run dev
```

---

## Folder Structure

```
pract/
├── Backend/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── server.js
│   └── ...
├── src/
│   ├── Components/
│   ├── store/
│   ├── App.jsx
│   └── ...
├── public/
├── package.json
└── README.md
```

---

## Resume Upload (Cloudinary)

- Only PDF files are allowed for upload.
- Resume files are uploaded to Cloudinary and the secure URL is saved in the employee's profile.
- Employees can view, delete, and re-upload their resume from their profile page.

---

## Project Overview

This portal allows employers to post jobs and internships, and employees (students/job seekers) to apply for them. Employers can manage applications, while employees can track their applications and manage their profiles. The system ensures that each user only accesses features relevant to their role.

- **Employers** can:
  - Register and log in.
  - Create and manage job/internship postings.
  - View and manage applications from employees.
  - Update their organization profile.

- **Employees** can:
  - Register and log in.
  - Browse and apply for jobs/internships.
  - Upload and manage their resume.
  - Update their personal profile.
  - Track their application status.

The backend is built with Express and MongoDB, handling authentication, authorization, and all business logic. The frontend is a modern React SPA using Redux for state management and Tailwind CSS for styling.

---

## License

MIT

---

For questions or contributions, please open an issue or submit a pull request.
